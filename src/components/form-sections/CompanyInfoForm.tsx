
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarIcon, Building, FileText } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  fantasyName: z.string().min(1, { message: "Fantasy name is required" }),
  legalName: z.string().min(1, { message: "Legal name is required" }),
  documentNumber: z.string().min(1, { message: "CNPJ/CPF is required" }),
  establishmentType: z.string().min(1, { message: "Establishment type is required" }),
  cnae: z.string().min(1, { message: "CNAE/MCC is required" }),
  openingDate: z.date({
    required_error: "Opening date is required",
  }),
});

interface CompanyInfoFormProps {
  initialData: any;
  onSubmit: (data: z.infer<typeof formSchema>) => void;
}

const CompanyInfoForm = ({ initialData = {}, onSubmit }: CompanyInfoFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fantasyName: initialData.fantasyName || "",
      legalName: initialData.legalName || "",
      documentNumber: initialData.documentNumber || "",
      establishmentType: initialData.establishmentType || "",
      cnae: initialData.cnae || "",
      openingDate: initialData.openingDate || undefined,
    },
  });

  return (
    <Form {...form}>
      <form
        id="form-step-0"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="fantasyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome Fantasia *</FormLabel>
                <FormControl>
                  <div className="flex">
                    <div className="flex items-center px-3 bg-gray-50 border border-r-0 rounded-l-md border-input">
                      <Building className="h-4 w-4 text-gray-500" />
                    </div>
                    <Input
                      placeholder="Your business name"
                      {...field}
                      className="rounded-l-none"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="legalName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cliente/Razão Social *</FormLabel>
                <FormControl>
                  <Input placeholder="Legal name of company" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="documentNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CNPJ/CPF *</FormLabel>
                <FormControl>
                  <Input placeholder="00.000.000/0001-00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="establishmentType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Estabelecimento *</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Retail, Service" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cnae"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CNAE / MCC *</FormLabel>
                <FormControl>
                  <div className="flex">
                    <div className="flex items-center px-3 bg-gray-50 border border-r-0 rounded-l-md border-input">
                      <FileText className="h-4 w-4 text-gray-500" />
                    </div>
                    <Input
                      placeholder="Activity code"
                      {...field}
                      className="rounded-l-none"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="openingDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Data de Abertura</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Select opening date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export default CompanyInfoForm;
