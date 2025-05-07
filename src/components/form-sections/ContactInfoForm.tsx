
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Mail, Phone } from "lucide-react";
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
  email: z.string().email({ message: "Invalid email address" }),
  countryCode: z.string().min(1, { message: "Country code is required" }),
  areaCode: z.string().min(1, { message: "Area code is required" }),
  phoneNumber: z.string().min(1, { message: "Phone number is required" }),
  phoneType: z.string().min(1, { message: "Phone type is required" }),
});

interface ContactInfoFormProps {
  initialData: any;
  onSubmit: (data: z.infer<typeof formSchema>) => void;
}

const ContactInfoForm = ({ initialData = {}, onSubmit }: ContactInfoFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: initialData.email || "",
      countryCode: initialData.countryCode || "",
      areaCode: initialData.areaCode || "",
      phoneNumber: initialData.phoneNumber || "",
      phoneType: initialData.phoneType || "",
    },
  });

  return (
    <Form {...form}>
      <form
        id="form-step-1"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-blip-text-gray font-medium">Email *</FormLabel>
                <FormControl>
                  <div className="flex">
                    <div className="flex items-center px-3 bg-blip-secondary-light border border-r-0 rounded-l-md border-blip-light-cyan">
                      <Mail className="h-4 w-4 text-blip-gray" />
                    </div>
                    <Input
                      placeholder="your@email.com"
                      {...field}
                      className="rounded-l-none border-blip-light-cyan focus:border-primary focus:ring-primary"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-blip-error" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="countryCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-blip-text-gray font-medium">Código do País *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="border-blip-light-cyan focus:ring-primary">
                      <SelectValue placeholder="Select country code" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white border-blip-light-cyan">
                    <SelectItem value="55" className="text-blip-text-gray hover:bg-blip-secondary-light">Brazil (+55)</SelectItem>
                    <SelectItem value="1" className="text-blip-text-gray hover:bg-blip-secondary-light">USA/Canada (+1)</SelectItem>
                    <SelectItem value="44" className="text-blip-text-gray hover:bg-blip-secondary-light">UK (+44)</SelectItem>
                    <SelectItem value="351" className="text-blip-text-gray hover:bg-blip-secondary-light">Portugal (+351)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-blip-error" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="areaCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-blip-text-gray font-medium">Código de área *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g. 11" 
                    {...field} 
                    className="border-blip-light-cyan focus:border-primary focus:ring-primary"
                  />
                </FormControl>
                <FormMessage className="text-blip-error" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-blip-text-gray font-medium">Número do Telefone *</FormLabel>
                <FormControl>
                  <div className="flex">
                    <div className="flex items-center px-3 bg-blip-secondary-light border border-r-0 rounded-l-md border-blip-light-cyan">
                      <Phone className="h-4 w-4 text-blip-gray" />
                    </div>
                    <Input
                      placeholder="98765-4321"
                      {...field}
                      className="rounded-l-none border-blip-light-cyan focus:border-primary focus:ring-primary"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-blip-error" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-blip-text-gray font-medium">Tipo de telefone *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="border-blip-light-cyan focus:ring-primary">
                      <SelectValue placeholder="Select phone type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white border-blip-light-cyan">
                    <SelectItem value="mobile" className="text-blip-text-gray hover:bg-blip-secondary-light">Mobile</SelectItem>
                    <SelectItem value="landline" className="text-blip-text-gray hover:bg-blip-secondary-light">Landline</SelectItem>
                    <SelectItem value="business" className="text-blip-text-gray hover:bg-blip-secondary-light">Business</SelectItem>
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

export default ContactInfoForm;
