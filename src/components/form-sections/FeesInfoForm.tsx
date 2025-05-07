
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
          <div className="p-4 bg-[#F8F9FA] border border-[#E8EBEE] rounded-md shadow-sm">
            <h3 className="text-xl font-medium mb-2 text-[#2CC3D5]">Anticipation Options</h3>
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
                      <RadioGroupItem value="none" id="none" className="border-[#C9DFE4] checked:border-[#2CC3D5] checked:bg-[#2CC3D5]" />
                      <Label htmlFor="none" className="text-[#52636C] cursor-pointer">No Anticipation</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-md hover:bg-[#F8F9FA] transition-colors">
                      <RadioGroupItem value="occasional" id="occasional" className="border-[#C9DFE4] checked:border-[#2CC3D5] checked:bg-[#2CC3D5]" />
                      <Label htmlFor="occasional" className="text-[#52636C] cursor-pointer">Occasional Anticipation</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-md hover:bg-[#F8F9FA] transition-colors">
                      <RadioGroupItem value="mandatory" id="mandatory" className="border-[#C9DFE4] checked:border-[#2CC3D5] checked:bg-[#2CC3D5]" />
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
              <h4 className="text-md font-medium flex items-center gap-2 text-[#2CC3D5]">
                <Calendar className="h-5 w-5 text-[#2CC3D5]" />
                <span>Anticipation Options</span>
              </h4>
              
              <FormField
                control={form.control}
                name="anticipationPeriodicity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#52636C] font-medium">Periodicity *</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-white border-[#C9DFE4] focus:border-[#2CC3D5] focus:ring-[#2CC3D5]">
                          <SelectValue placeholder="Select periodicity" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white border-[#C9DFE4]">
                        <SelectItem value="daily" className="text-[#52636C] hover:bg-[#F8F9FA] hover:text-[#2CC3D5]">Daily</SelectItem>
                        <SelectItem value="weekly" className="text-[#52636C] hover:bg-[#F8F9FA] hover:text-[#2CC3D5]">Weekly</SelectItem>
                        <SelectItem value="biweekly" className="text-[#52636C] hover:bg-[#F8F9FA] hover:text-[#2CC3D5]">Bi-weekly</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription className="text-[#8CA0B3]">
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
                          className="pl-8 bg-white border-[#C9DFE4] focus:border-[#2CC3D5] focus:ring-[#2CC3D5]"
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

          <FormField
            control={form.control}
            name="additionalFeeInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#52636C] font-medium">Additional Information</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Any additional information about fees..."
                    className="bg-white border-[#C9DFE4] focus:border-[#2CC3D5] focus:ring-[#2CC3D5]"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[#FF4A1E]" />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export default FeesInfoForm;
