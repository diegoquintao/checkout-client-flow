
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
  paymentMethod: z.string().min(1, { message: "Payment method is required" }),
  cardProcessingMethod: z.string().min(1, { message: "Card processing method is required" }),
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
      paymentMethod: initialData.paymentMethod || "",
      cardProcessingMethod: initialData.cardProcessingMethod || "",
      terminalTimeZone: initialData.terminalTimeZone || "",
    },
  });

  return (
    <Form {...form}>
      <form
        id="form-step-3"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-blip-text-gray font-medium">Método de Processamento *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="border-blip-light-cyan focus:ring-primary">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white border-blip-light-cyan">
                    <SelectItem value="credit" className="text-blip-text-gray hover:bg-blip-secondary-light">Credit Card</SelectItem>
                    <SelectItem value="debit" className="text-blip-text-gray hover:bg-blip-secondary-light">Debit Card</SelectItem>
                    <SelectItem value="pix" className="text-blip-text-gray hover:bg-blip-secondary-light">PIX</SelectItem>
                    <SelectItem value="boleto" className="text-blip-text-gray hover:bg-blip-secondary-light">Boleto</SelectItem>
                    <SelectItem value="transfer" className="text-blip-text-gray hover:bg-blip-secondary-light">Bank Transfer</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-blip-error" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cardProcessingMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-blip-text-gray font-medium">Processamento do Cartão *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="border-blip-light-cyan focus:ring-primary">
                      <SelectValue placeholder="Select card processing method" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white border-blip-light-cyan">
                    <SelectItem value="pos" className="text-blip-text-gray hover:bg-blip-secondary-light">POS Terminal</SelectItem>
                    <SelectItem value="online" className="text-blip-text-gray hover:bg-blip-secondary-light">Online Gateway</SelectItem>
                    <SelectItem value="mobile" className="text-blip-text-gray hover:bg-blip-secondary-light">Mobile Payment</SelectItem>
                    <SelectItem value="moto" className="text-blip-text-gray hover:bg-blip-secondary-light">MOTO (Mail Order/Telephone Order)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-blip-error" />
              </FormItem>
            )}
          />

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
