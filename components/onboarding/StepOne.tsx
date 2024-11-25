import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { CiHeart } from 'react-icons/ci';
import { FaChevronRight } from 'react-icons/fa6';
import { GiWineGlass } from 'react-icons/gi';
import { EventType } from '@prisma/client';
import OnboardingStepper from './Stepper';
import wedinIcon from '@/public/assets/w-icon.svg';
import Image from 'next/image';
import { useOnboarding } from '@/hooks/useOnboarding';

export default function OnboardingStepOne() {
  const { handleEventTypeUpdate, saveEventTypeToLocalStorage, loading } = useOnboarding();

  const handleCardClick = (eventType: EventType) => {
    saveEventTypeToLocalStorage(eventType);
    handleEventTypeUpdate(eventType);
  };

  return (
    <div className="relative flex flex-col justify-center items-center gap-8 h-full">
      <Image src={wedinIcon} alt="wedin icon" width={78} />

      <div className="flex flex-col gap-4 text-center">
        <h1 className="text-textSecondary text-2xl font-medium">
          ¿Que tipo de evento queres crear?
        </h1>
        <p className="text-secondary400">
          El tema de tu sitio web va a cambiar dependiendo del tipo de evento
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-8 items-center">
        <Card
          className={`w-64 bg-gray50 border-gray200 hover:bg-gray200 transition-all cursor-pointer rounded-2xl ${
            loading ? 'cursor-not-allowed pointer-events-none opacity-65' : ''
          }`}
          onClick={() => {
            handleCardClick(EventType.WEDDING);
          }}
        >
          <CardHeader>
            <CiHeart className="text-4xl" />
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-textPrimary">
              Un casamiento
            </h1>
            <FaChevronRight className="text-sm" />
          </CardContent>
        </Card>

        <div className="h-12 border-r border-gray200 sm:block hidden"></div>

        <Card
          className={`w-64 bg-gray50 border-gray200 hover:bg-gray200 transition-all cursor-pointer rounded-2xl ${
            loading ? 'cursor-not-allowed pointer-events-none opacity-70' : ''
          }`}
          onClick={() => {
            handleCardClick(EventType.OTHER);
          }}
        >
          <CardHeader>
            <GiWineGlass className="text-4xl" />
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-textPrimary">
              Otro tipo de evento
            </h1>
            <FaChevronRight className="text-sm" />
          </CardContent>
        </Card>
      </div>

      <OnboardingStepper step={1} />
    </div>
  );
}
