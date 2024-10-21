import { getSignedURL } from '@/actions/upload-to-s3';
import { computeSHA256 } from './utils';

type UploadImagesToAwsParams = {
  files: File[]; 
  eventId: string;
};

export const uploadEventCoverImagesToAws = async ({
  files,
  eventId,
}: UploadImagesToAwsParams) => {
  if (!files.length || files.length > 6) {
    return { error: 'You must upload between 1 and 6 images.' };
  }

  const uploadedImages: string[] = [];

  for (const file of files) {
    const checksum = await computeSHA256(file);

    const presignResponse = await getSignedURL({
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
      id: eventId,
      type: 'eventId',
      checksum,
    });

    if (presignResponse.error || !presignResponse?.success) {
      return { error: presignResponse.error };
    }

    const imageUrl = presignResponse.success.split('?')[0];

    if (!imageUrl) {
      return { error: 'Failed to upload image' };
    }

    const awsImagePosting = await fetch(imageUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
        metadata: JSON.stringify({ eventId }),
      },
    });

    if (!awsImagePosting.ok) {
      return { error: awsImagePosting.statusText };
    }

    uploadedImages.push(imageUrl);  
  }

  return { uploadedImages };  
};