import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  terminalTimeZone: z.string().optional(),
});

interface OperationInfoFormProps {
  initialData: any;
  onSubmit: (data: z.infer<typeof formSchema>) => void;
}

const OperationInfoForm = ({ initialData = {}, onSubmit }: OperationInfoFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      terminalTimeZone: initialData.terminalTimeZone || "",
    },
  });

  const handleFormSubmit = (data: z.infer<typeof formSchema>) => {
    // Include the fixed values in the submitted data
    const completeData = {
      ...data,
      paymentMethod: "credit",
      cardProcessingMethod: "cnp",
    };
    onSubmit(completeData);
  };

  return (
    <Form {...form}>
      <form
        id="form-step-6"
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Fixed value display for Payment Method */}
          <div className="space-y-2">
            <FormLabel className="text-blip-text-gray font-medium block">
              Método de Processamento
            </FormLabel>
            <div className="p-2.5 border border-blip-light-cyan rounded-md bg-blip-secondary-light/30">
              <p className="text-blip-dark-gray">Cartão de crédito</p>
            </div>
          </div>

          {/* Fixed value display for Card Processing Method */}
          <div className="space-y-2">
            <FormLabel className="text-blip-text-gray font-medium block">
              Processamento do Cartão
            </FormLabel>
            <div className="p-2.5 border border-blip-light-cyan rounded-md bg-blip-secondary-light/30">
              <p className="text-blip-dark-gray">CNP - Cartão Não Presente</p>
            </div>
          </div>

          {/* Keep the time zone selection dropdown */}
          <FormField
            control={form.control}
            name="terminalTimeZone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-blip-text-gray font-medium">Fuso horário do terminal</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="border-blip-light-cyan focus:ring-primary">
                      <SelectValue placeholder="Select terminal time zone" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white border-blip-light-cyan">
                    <SelectItem value="america_sao_paulo" className="text-blip-text-gray hover:bg-blip-secondary-light">America/Sao_Paulo</SelectItem>
                    <SelectItem value="america_manaus" className="text-blip-text-gray hover:bg-blip-secondary-light">America/Manaus</SelectItem>
                    <SelectItem value="america_rio_branco" className="text-blip-text-gray hover:bg-blip-secondary-light">America/Rio_Branco</SelectItem>
                    <SelectItem value="america_belem" className="text-blip-text-gray hover:bg-blip-secondary-light">America/Belem</SelectItem>
                    <SelectItem value="america_fortaleza" className="text-blip-text-gray hover:bg-blip-secondary-light">America/Fortaleza</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-blip-error" />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export default OperationInfoForm;
