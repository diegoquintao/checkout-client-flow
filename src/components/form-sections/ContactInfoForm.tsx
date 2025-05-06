
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { mail, phone } from "lucide-react";
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
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <div className="flex">
                    <div className="flex items-center px-3 bg-gray-50 border border-r-0 rounded-l-md border-input">
                      <mail className="h-4 w-4 text-gray-500" />
                    </div>
                    <Input
                      placeholder="your@email.com"
                      {...field}
                      className="rounded-l-none"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="countryCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código do País *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country code" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="55">Brazil (+55)</SelectItem>
                    <SelectItem value="1">USA/Canada (+1)</SelectItem>
                    <SelectItem value="44">UK (+44)</SelectItem>
                    <SelectItem value="351">Portugal (+351)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="areaCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código de área *</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. 11" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número do Telefone *</FormLabel>
                <FormControl>
                  <div className="flex">
                    <div className="flex items-center px-3 bg-gray-50 border border-r-0 rounded-l-md border-input">
                      <phone className="h-4 w-4 text-gray-500" />
                    </div>
                    <Input
                      placeholder="98765-4321"
                      {...field}
                      className="rounded-l-none"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de telefone *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select phone type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="mobile">Mobile</SelectItem>
                    <SelectItem value="landline">Landline</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
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

export default ContactInfoForm;
