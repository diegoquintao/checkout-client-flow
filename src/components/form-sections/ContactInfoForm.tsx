import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Mail, Phone } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  phoneNumber: z.string()
    .min(10, { message: "Phone number must include country code, area code and number" })
    .regex(/^\+\d+\s\(\d+\)\s\d+$/, { message: "Phone format should be like +55 (31) 985882414" }),
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
      phoneNumber: initialData.phoneNumber || "+55 (",
      phoneType: initialData.phoneType || "",
    },
  });

  const formatPhoneNumber = (value: string) => {
    // Keep the first part of the string that matches the pattern
    if (!value) return "+55 (";
    if (value.startsWith("+")) {
      // Format: +XX (YY) ZZZZZZZZZ
      const numbers = value.replace(/\D/g, "");
      
      // Country code (always keep at least the "+")
      let countryCode = "+";
      if (numbers.length > 0) {
        countryCode = "+" + numbers.substring(0, 2);
      }
      
      // Area code
      let areaCode = "";
      if (numbers.length > 2) {
        areaCode = " (" + numbers.substring(2, 4);
        if ((numbers.length > 4) || (numbers.length === 4 && value.includes(")"))) {
          areaCode += ")";
        }
      }
      
      // Rest of the number
      let phoneNumber = "";
      if (numbers.length > 4) {
        phoneNumber = " " + numbers.substring(4);
      }
      
      return countryCode + areaCode + phoneNumber;
    }
    return "+55 (";
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: (...event: any[]) => void) => {
    const formattedValue = formatPhoneNumber(e.target.value);
    onChange(formattedValue);
  };

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
                      className="rounded-l-none border-blip-light-cyan focus:border-primary focus:ring-primary bg-white"
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
                    <SelectTrigger className="border-blip-light-cyan focus:ring-primary bg-white">
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

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel className="text-blip-text-gray font-medium">Número do Telefone *</FormLabel>
                <FormControl>
                  <div className="flex">
                    <div className="flex items-center px-3 bg-blip-secondary-light border border-r-0 rounded-l-md border-blip-light-cyan">
                      <Phone className="h-4 w-4 text-blip-gray" />
                    </div>
                    <Input
                      placeholder="+55 (31) 985882414"
                      {...field}
                      onChange={(e) => handlePhoneChange(e, field.onChange)}
                      className="rounded-l-none border-blip-light-cyan focus:border-primary focus:ring-primary bg-white"
                    />
                  </div>
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

export default ContactInfoForm;
