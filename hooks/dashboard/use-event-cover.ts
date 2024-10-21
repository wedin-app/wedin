// ./hooks/dashboard/use-event-cover.ts

'use client';

import React, { useState, useRef } from 'react';
import { updateEventImages } from '@/actions/data/images';
import { uploadEventCoverImagesToAws } from '@/lib/s3';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { EventCoverFormSchema } from '@/schemas/dashboard';
import { z } from 'zod';

type EventCoverUpdateFormProps = {
  eventId: string | null;
  imagesUrls: string[] | null;
  message: string | null;
  images: File[];
};

export function useEventCover({
  eventId,
  imagesUrls,
  message,
  images,
}: EventCoverUpdateFormProps) {
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[] | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const form = useForm({
    // resolver: zodResolver(EventCoverFormSchema),
    defaultValues: {
      eventId: eventId ?? '',
      imagesUrls: imagesUrls ?? [],
      message: message ?? '',
      images: images ?? [],
    },
  });

  const { formState, handleSubmit } = form;
  const { isDirty } = formState;

  const handleFileChange = (action: React.ChangeEvent<HTMLInputElement>) => {
    const files = action.target.files ? Array.from(action.target.files) : [];

    if (files.length > 0) {
      const newFiles = selectedFiles ? [...selectedFiles, ...files] : files;
      const previews = newFiles.map(file => URL.createObjectURL(file));

      setSelectedFiles(newFiles.slice(0, 6));
      setPreviewUrls(previews.slice(0, 6));
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemoveImage = (index: number) => {
    if (selectedFiles) {
      const newFiles = selectedFiles.filter((_, idx) => idx !== index);
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));

      setSelectedFiles(newFiles);
      setPreviewUrls(newPreviews);
    }
  };

  const handleReset = () => {
    setSelectedFiles(null);
    setPreviewUrls(null);
    form.reset();
  };

  const onSubmit = async (values: z.infer<typeof EventCoverFormSchema>) => {
    console.log("Submitted values:", values);
    setLoading(true);

    if (!Object.keys(formState.dirtyFields).length) {
      setLoading(false);
      return;
    }

    const validatedFields = EventCoverFormSchema.safeParse(values);

    if (!validatedFields.success) {
      console.log("Validation failed", validatedFields.error)
      toast({
        title: 'Error',
        description: 'Archivo invalido, por favor intenta de nuevo.',
        variant: 'destructive',
      });
      setLoading(false);
      return;
    }

    if (selectedFiles) {
      const uploadResponse = await uploadEventCoverImagesToAws({
        files: selectedFiles,
        eventId: values.eventId,
      });

      if (uploadResponse?.error) {
        toast({
          title: 'Error',
          description: uploadResponse.error,
          variant: 'destructive',
        });
        setLoading(false);
        return;
      }

      const updatedEvent = await updateEventImages({
        eventId: values.eventId,
        imageUrls: uploadResponse.uploadedImages ?? [],
      });

      if (updatedEvent?.error) {
        toast({
          title: 'Error',
          description: updatedEvent.error,
          variant: 'destructive',
        });
        setLoading(false);
        return;
      }
      toast({
        title: 'La portada de tu evento fue actualizado correctamente. 🖼️🎉',
        className: 'bg-white',
      });
    }
    setLoading(false);
  };

  return {
    form,
    loading,
    isDirty,
    previewUrls,
    fileInputRef,
    handleFileChange,
    handleButtonClick,
    handleRemoveImage,
    handleReset,
    onSubmit,
  };
}
