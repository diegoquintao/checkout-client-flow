
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import CNAESelector from "./CNAESelector";
import CNPJInput from "./CNPJInput";
import DatePicker from "./DatePicker";

const formSchema = z.object({
  fantasyName: z.string().min(1, { message: "Fantasy name is required" }),
  legalName: z.string().min(1, { message: "Legal name is required" }),
  documentNumber: z.string().length(18, { message: "CNPJ must be in format 00.000.000/0001-00" })
    .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, { message: "Invalid CNPJ format" }),
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
                <FormLabel className="text-blip-text-gray font-medium">Nome Fantasia *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your business name"
                    {...field}
                    className="border-blip-light-cyan focus:border-primary focus:ring-primary bg-white"
                  />
                </FormControl>
                <FormMessage className="text-blip-error" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="legalName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-blip-text-gray font-medium">Cliente/Razão Social *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Legal name of company" 
                    {...field} 
                    className="border-blip-light-cyan focus:border-primary focus:ring-primary bg-white"
                  />
                </FormControl>
                <FormMessage className="text-blip-error" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="documentNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-blip-text-gray font-medium">CNPJ *</FormLabel>
                <FormControl>
                  <CNPJInput
                    value={field.value}
                    onChange={field.onChange}
                    className="border-blip-light-cyan focus:border-primary focus:ring-primary bg-white"
                  />
                </FormControl>
                <FormMessage className="text-blip-error" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="establishmentType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-blip-text-gray font-medium">Tipo de Estabelecimento *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g. Retail, Service" 
                    {...field} 
                    className="border-blip-light-cyan focus:border-primary focus:ring-primary bg-white"
                  />
                </FormControl>
                <FormMessage className="text-blip-error" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cnae"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-blip-text-gray font-medium">CNAE / MCC *</FormLabel>
                <FormControl>
                  <CNAESelector
                    value={field.value}
                    onValueChange={field.onChange}
                    placeholder="Select CNAE"
                  />
                </FormControl>
                <FormMessage className="text-blip-error" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="openingDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-blip-text-gray font-medium">Data de Abertura</FormLabel>
                <FormControl>
                  <DatePicker
                    value={field.value}
                    onSelect={field.onChange}
                    placeholder="Select opening date"
                  />
                </FormControl>
                <FormMessage className="text-blip-error" />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export default CompanyInfoForm;
