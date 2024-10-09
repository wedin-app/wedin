import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IoIosList } from 'react-icons/io';
import { TbCurrencyDollar } from 'react-icons/tb';
import DashboardEventUserUpdateForm from '@/components/forms/dashboard/event-user-update';
import DashboardSettingsSkeleton from '@/components/skeletons/dashboard-settings';
import DashboardBankDetailsUpdateForm from '@/components/forms/dashboard/bank-details-update';

export default function DashboardSettings() {
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <DashboardSettingsSkeleton />;
  }

  return (
    <div className="w-full h-screen flex justify-center items-center px-10 flex-col gap-8">
      <div className="w-full flex flex-col gap-4 border-b border-gray-200 pb-6">
        <h1 className="text-2xl font-black">Configuraciones</h1>
        <p className="text-textTertiary">
          Define los detalles importantes de tu evento: establece la fecha,
          añade invitados y configura la información bancaria.
        </p>
      </div>

      <div className="flex items-start w-full">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="gap-4">
            <TabsTrigger value="general">
              <IoIosList className="text-xl" />
              Configuración General
            </TabsTrigger>
            <TabsTrigger value="bank">
              <TbCurrencyDollar className="text-xl" />
              Configuración bancaria
            </TabsTrigger>
          </TabsList>
          <TabsContent value="general" className="mt-8">
            <DashboardEventUserUpdateForm/>
          </TabsContent>
          <TabsContent value="bank" className="mt-8">
            <DashboardBankDetailsUpdateForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
