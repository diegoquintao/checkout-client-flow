
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
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
import { Checkbox } from "@/components/ui/checkbox";

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
                <FormLabel>Método de Processamento *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="credit">Credit Card</SelectItem>
                    <SelectItem value="debit">Debit Card</SelectItem>
                    <SelectItem value="pix">PIX</SelectItem>
                    <SelectItem value="boleto">Boleto</SelectItem>
                    <SelectItem value="transfer">Bank Transfer</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cardProcessingMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Processamento do Cartão *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select card processing method" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="pos">POS Terminal</SelectItem>
                    <SelectItem value="online">Online Gateway</SelectItem>
                    <SelectItem value="mobile">Mobile Payment</SelectItem>
                    <SelectItem value="moto">MOTO (Mail Order/Telephone Order)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="terminalTimeZone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fuso horário do terminal</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select terminal time zone" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="america_sao_paulo">America/Sao_Paulo</SelectItem>
                    <SelectItem value="america_manaus">America/Manaus</SelectItem>
                    <SelectItem value="america_rio_branco">America/Rio_Branco</SelectItem>
                    <SelectItem value="america_belem">America/Belem</SelectItem>
                    <SelectItem value="america_fortaleza">America/Fortaleza</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export default OperationInfoForm;
