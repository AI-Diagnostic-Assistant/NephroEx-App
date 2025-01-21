"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { analysisFormSchema } from "@/lib/schemas";
import { AnalysisFormValues } from "@/lib/types";
import useSWR from "swr";
import { createPatient, getAllPatients } from "@/lib/data-access";

export default function FileUpload({ token }: { token: string }) {
  const router = useRouter();
  const form = useForm<AnalysisFormValues>({
    resolver: zodResolver(analysisFormSchema),
    defaultValues: {
      patientId: "",
      patientName: "",
    },
  });

  const { data: patients } = useSWR("/patient", getAllPatients);

  const patientId = form.watch("patientId");
  const patientName = form.watch("patientName");

  const handleUpload = async (data: AnalysisFormValues) => {
    const formData = new FormData();
    formData.append("file", data.dicomImages);

    if (data.patientId) {
      formData.append("patientId", data.patientId);
    } else if (data.patientName) {
      const { data: patientData, error } = await createPatient(
        data.patientName,
        data.email ?? null,
      );
      if (error || !patientData) {
        alert("An error occurred while creating the patient.");
        return;
      }
      formData.append("patientId", patientData.id);
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/classify", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      router.push(`/analysis/${data.id}`);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("An error occurred during upload.");
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <Tabs defaultValue="existing" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="existing">Existing patient</TabsTrigger>
          <TabsTrigger value="new">New patient</TabsTrigger>
        </TabsList>
        <Card className="mt-2">
          <CardHeader>
            <CardTitle>Create new analysis</CardTitle>
            <CardDescription>
              Create and perform an analysis on a new or existing patient.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleUpload)}
                className="flex flex-col gap-4"
              >
                <TabsContent value="existing">
                  <FormField
                    control={form.control}
                    name="patientId"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Patient</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            disabled={!!patientName}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a patient to create the analysis for" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {patients?.data?.map((patient) => (
                                <SelectItem key={patient.id} value={patient.id}>
                                  {patient.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {patientName && (
                            <FormDescription>
                              Cannot select patient when trying to create a new
                              one. Remove the name in the &#34;New patient&#34;
                              tab.
                            </FormDescription>
                          )}
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </TabsContent>
                <TabsContent className="space-y-2" value="new">
                  <FormField
                    control={form.control}
                    name="patientName"
                    disabled={!!patientId}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Wendy Adams"
                              type="text"
                              {...field}
                            ></Input>
                          </FormControl>
                          {patientId && (
                            <FormDescription>
                              Cannot create patient when patient is already
                              selected. Refresh the page to reset.
                            </FormDescription>
                          )}
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    disabled={!!patientId}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="email@example.com"
                              type="text"
                              {...field}
                            ></Input>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </TabsContent>

                <FormField
                  control={form.control}
                  name="dicomImages"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Images</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="DICOM images"
                            type="file"
                            accept="application/dicom"
                            onChange={(e) => {
                              const file = e.target.files?.item(0);
                              if (file) {
                                field.onChange(file);
                              }
                            }}
                          ></Input>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <Button className="mt-8 w-full" type="submit">
                  Legg til prosjekt
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
}
