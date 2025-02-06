"use client";

import { useParams } from "next/navigation";
import useSWR from "swr";
import { getPatientByReportId } from "@/lib/data-access/patient";
import { User } from "lucide-react";

export default function PatientInfo() {
  const params = useParams();
  const id = params.id;

  const {
    data: patient,
    error,
    isLoading,
  } = useSWR(id ? ["/patient/", id] : null, ([_, id]) =>
    getPatientByReportId(Number(id)),
  );

  if (isLoading) {
    return;
  }

  if (error) {
    return <div>Error fetching patient data</div>;
  }

  if (!patient) {
    return <div>Patient not found</div>;
  }

  return (
    <div className="flex flex-col divide-y border rounded-md">
      <div className="flex gap-2 px-6 py-6 items-center">
        <User className="text-muted-foreground" />
        <h4 className="font-medium text-sm">Patient Information</h4>
      </div>
      <div className="flex flex-col gap-1 px-3 py-2">
        <p className="text-xs text-gray-500">Name</p>
        <p className="text-sm font-medium">{patient.name}</p>
      </div>
      <div className="flex flex-col gap-1  px-3 py-2">
        <p className="text-xs text-gray-500">Age</p>
        <p className="text-sm font-medium">{patient.age} years</p>
      </div>
      <div className="flex flex-col gap-1  px-3 py-2">
        <p className="text-xs text-gray-500">Email</p>
        <p className="text-sm font-medium">{patient.email}</p>
      </div>
      <div className="flex flex-col gap-1  px-3 py-2">
        <p className="text-xs text-gray-500">Medical ID</p>
        <p className="text-sm font-medium">{patient.id}</p>
      </div>
    </div>
  );
}
