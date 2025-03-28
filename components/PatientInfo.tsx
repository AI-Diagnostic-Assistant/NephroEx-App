"use client";

import { useParams } from "next/navigation";
import useSWR from "swr";
import { getPatientByReportId } from "@/lib/data-access/patient";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";
import ModuleCard from "@/components/module-card";

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
    <ModuleCard
      className="shrink-0 w-[390px]"
      title="Patien Information"
      icon={<User className="text-primary-brand" />}
    >
      <Item label={"Name"} value={patient.name} />
      <Item label={"Age"} value={patient.age} />
      <Item label={"Email"} value={patient.email} small />
      <Item label={"Medical ID"} value={patient.id} small />
    </ModuleCard>
  );
}

const Item = ({
  label,
  value,
  small,
}: {
  label: string;
  value: string | number | null;
  small?: boolean;
}) => (
  <div className="flex flex-col gap-1 py-2">
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className={cn(small && "text-xs", "font-medium")}>{value ?? "-"}</p>
  </div>
);
