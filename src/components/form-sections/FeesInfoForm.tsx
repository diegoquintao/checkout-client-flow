
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
  FormDescription,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Calendar } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  anticipationType: z.enum(["none", "occasional", "mandatory"], {
    required_error: "Anticipation type is required",
  }),
  anticipationPeriodicity: z.enum(["daily", "weekly", "biweekly"]).optional(),
  anticipationAmount: z.string().optional(),
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
      anticipationType: initialData.anticipationType || "none",
      anticipationPeriodicity: initialData.anticipationPeriodicity || undefined,
      anticipationAmount: initialData.anticipationAmount || "",
      additionalFeeInfo: initialData.additionalFeeInfo || "",
    },
  });
  
  const anticipationType = form.watch("anticipationType");
  const showAnticipationOptions = anticipationType === "mandatory";

  return (
    <Form {...form}>
      <form
        id="form-step-5"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 gap-6">
          <div className="p-4 bg-blue-50 rounded-md">
            <h3 className="text-xl font-medium mb-2">Anticipation Options</h3>
            <p className="text-sm text-gray-600 mb-4">
              Select your preferred payment anticipation method.
            </p>
          </div>

          <FormField
            control={form.control}
            name="anticipationType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Anticipation Type *</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="none" id="none" />
                      <Label htmlFor="none">No Anticipation</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="occasional" id="occasional" />
                      <Label htmlFor="occasional">Occasional Anticipation</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mandatory" id="mandatory" />
                      <Label htmlFor="mandatory">Mandatory Anticipation</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {showAnticipationOptions && (
            <div className="border border-gray-200 rounded-md p-4 space-y-4 bg-gray-50">
              <h4 className="text-md font-medium flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                <span>Anticipation Options</span>
              </h4>
              
              <FormField
                control={form.control}
                name="anticipationPeriodicity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Periodicity *</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select periodicity" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="biweekly">Bi-weekly</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      How often you want to receive anticipated payments.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="anticipationAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Anticipation Amount *</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 inset-y-0 flex items-center text-gray-500">
                          %
                        </span>
                        <Input
                          placeholder="Enter percentage (0-100)"
                          className="pl-8"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      The percentage of available funds to be anticipated in each period.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

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
