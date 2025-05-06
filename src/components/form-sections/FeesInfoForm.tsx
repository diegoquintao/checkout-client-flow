
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  feeStructure: z.string().min(1, { message: "Fee structure is required" }),
  additionalFeeInfo: z.string().optional(),
});

interface FeesInfoFormProps {
  initialData: any;
  onSubmit: (data: z.infer<typeof formSchema>) => void;
}

const FeesInfoForm = ({ initialData = {}, onSubmit }: FeesInfoFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      feeStructure: initialData.feeStructure || "",
      additionalFeeInfo: initialData.additionalFeeInfo || "",
    },
  });

  return (
    <Form {...form}>
      <form
        id="form-step-2"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 gap-6">
          <div className="p-4 bg-yellow-50 rounded-md">
            <h3 className="text-xl font-medium mb-2">Taxas</h3>
            <p className="text-sm text-gray-600 mb-4">
              Provide information about your fee structure and rates for payment processing.
            </p>
          </div>

          <FormField
            control={form.control}
            name="feeStructure"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tabela de taxas *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter your fee structure information here..."
                    className="min-h-[150px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="additionalFeeInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Information</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Any additional information about fees..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export default FeesInfoForm;
