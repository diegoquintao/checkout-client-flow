
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  anticipationType: z.enum(["none", "occasional", "mandatory"], {
    required_error: "Anticipation type is required",
  }),
  anticipationPeriodicity: z.enum(["daily", "weekly", "biweekly"]).optional(),
  anticipationAmount: z.string().optional(),
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
          <div className="p-4 bg-[#F8F9FA] border border-[#E8EBEE] rounded-md shadow-sm">
            <h3 className="text-xl font-medium mb-2 text-[#1ba766]">Anticipation Options</h3>
            <p className="text-sm text-[#52636C] mb-4">
              Select your preferred payment anticipation method.
            </p>
          </div>

          <FormField
            control={form.control}
            name="anticipationType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-[#52636C] font-medium">Anticipation Type *</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-2"
                  >
                    <div className="flex items-center space-x-2 p-3 rounded-md hover:bg-[#F8F9FA] transition-colors">
                      <RadioGroupItem value="none" id="none" className="border-[#C9DFE4] checked:border-primary checked:bg-primary" />
                      <Label htmlFor="none" className="text-[#52636C] cursor-pointer">No Anticipation</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-md hover:bg-[#F8F9FA] transition-colors">
                      <RadioGroupItem value="occasional" id="occasional" className="border-[#C9DFE4] checked:border-primary checked:bg-primary" />
                      <Label htmlFor="occasional" className="text-[#52636C] cursor-pointer">Occasional Anticipation</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-md hover:bg-[#F8F9FA] transition-colors">
                      <RadioGroupItem value="mandatory" id="mandatory" className="border-[#C9DFE4] checked:border-primary checked:bg-primary" />
                      <Label htmlFor="mandatory" className="text-[#52636C] cursor-pointer">Mandatory Anticipation</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage className="text-[#FF4A1E]" />
              </FormItem>
            )}
          />

          {showAnticipationOptions && (
            <div className="border border-[#E8EBEE] rounded-md p-4 space-y-4 bg-[#F8F9FA] animate-in fade-in duration-300">
              <h4 className="text-md font-medium flex items-center gap-2 text-[#1ba766]">
                <Calendar className="h-5 w-5 text-[#1ba766]" />
                <span>Anticipation Options</span>
              </h4>
              
              <FormField
                control={form.control}
                name="anticipationPeriodicity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#52636C] font-medium mb-2 block">Periodicity *</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-row space-x-4"
                      >
                        <div className="flex items-center space-x-2 p-3 border rounded-md hover:bg-white transition-colors flex-1 justify-center">
                          <RadioGroupItem value="daily" id="daily" className="border-[#C9DFE4] checked:border-primary checked:bg-primary" />
                          <Label htmlFor="daily" className="text-[#52636C] cursor-pointer">Daily</Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 border rounded-md hover:bg-white transition-colors flex-1 justify-center">
                          <RadioGroupItem value="weekly" id="weekly" className="border-[#C9DFE4] checked:border-primary checked:bg-primary" />
                          <Label htmlFor="weekly" className="text-[#52636C] cursor-pointer">Weekly</Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 border rounded-md hover:bg-white transition-colors flex-1 justify-center">
                          <RadioGroupItem value="biweekly" id="biweekly" className="border-[#C9DFE4] checked:border-primary checked:bg-primary" />
                          <Label htmlFor="biweekly" className="text-[#52636C] cursor-pointer">Bi-weekly</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormDescription className="text-[#8CA0B3] mt-2">
                      How often you want to receive anticipated payments.
                    </FormDescription>
                    <FormMessage className="text-[#FF4A1E]" />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="anticipationAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#52636C] font-medium">Anticipation Amount *</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 inset-y-0 flex items-center text-[#8CA0B3]">
                          %
                        </span>
                        <Input
                          placeholder="Enter percentage (0-100)"
                          className="pl-8 bg-white border-[#C9DFE4] focus:border-primary focus:ring-primary"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormDescription className="text-[#8CA0B3]">
                      The percentage of available funds to be anticipated in each period.
                    </FormDescription>
                    <FormMessage className="text-[#FF4A1E]" />
                  </FormItem>
                )}
              />
            </div>
          )}
        </div>
      </form>
    </Form>
  );
};

export default FeesInfoForm;
