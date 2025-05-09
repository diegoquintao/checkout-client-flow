
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Banknote } from "lucide-react";
import { useState } from "react";
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
import { getBankDisplayOptions } from "@/utils/bankData";

const bankOptions = getBankDisplayOptions();

const formSchema = z.object({
  legalName: z.string().min(1, { message: "Legal name is required" }),
  documentNumber: z.string().min(1, { message: "CNPJ/CPF is required" }),
  accountType: z.string().min(1, { message: "Account type is required" }),
  bank: z.string().min(1, { message: "Bank is required" }),
  agency: z.string().min(1, { message: "Agency is required" })
    .regex(/^\d+-\d+$/, { message: "Agency should be in format 0000-0" }),
  accountNumber: z.string().min(1, { message: "Account number is required" })
    .regex(/^\d+-\d+$/, { message: "Account should be in format 00000-0" }),
  accountType2: z.string().min(1, { message: "Account type is required" }),
});

interface BankInfoFormProps {
  initialData: any;
  onSubmit: (data: z.infer<typeof formSchema>) => void;
}

const BankInfoForm = ({ initialData = {}, onSubmit }: BankInfoFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      legalName: initialData.legalName || "",
      documentNumber: initialData.documentNumber || "",
      accountType: initialData.accountType || "",
      bank: initialData.bank || "",
      agency: initialData.agency || "",
      accountNumber: initialData.accountNumber || "",
      accountType2: initialData.accountType2 || "",
    },
  });

  // Handle agency input formatting
  const formatAgency = (value: string) => {
    if (!value) return "";
    
    // Remove all non-digits and hyphens
    let cleanValue = value.replace(/[^\d-]/g, "");
    
    // Split by hyphen to get parts
    const parts = cleanValue.split("-");
    let agencyNumber = "";
    let agencyDigit = "";
    
    if (parts.length > 1) {
      agencyNumber = parts[0].replace(/\D/g, "");
      agencyDigit = parts[1].replace(/\D/g, "").substring(0, 1);
    } else {
      // If no hyphen, assume all are agency numbers except last digit
      if (cleanValue.length > 1) {
        agencyNumber = cleanValue.slice(0, -1).replace(/\D/g, "");
        agencyDigit = cleanValue.slice(-1).replace(/\D/g, "");
      } else {
        agencyNumber = cleanValue.replace(/\D/g, "");
      }
    }
    
    // Format as agency-digit
    if (agencyNumber && agencyDigit) {
      return `${agencyNumber}-${agencyDigit}`;
    } else if (agencyNumber) {
      return agencyNumber;
    }
    
    return cleanValue;
  };

  // Handle account input formatting
  const formatAccount = (value: string) => {
    if (!value) return "";
    
    // Remove all non-digits and hyphens
    let cleanValue = value.replace(/[^\d-]/g, "");
    
    // Split by hyphen to get parts
    const parts = cleanValue.split("-");
    let accountNumber = "";
    let accountDigit = "";
    
    if (parts.length > 1) {
      accountNumber = parts[0].replace(/\D/g, "");
      accountDigit = parts[1].replace(/\D/g, "").substring(0, 1);
    } else {
      // If no hyphen, assume all are account numbers except last digit
      if (cleanValue.length > 1) {
        accountNumber = cleanValue.slice(0, -1).replace(/\D/g, "");
        accountDigit = cleanValue.slice(-1).replace(/\D/g, "");
      } else {
        accountNumber = cleanValue.replace(/\D/g, "");
      }
    }
    
    // Format as account-digit
    if (accountNumber && accountDigit) {
      return `${accountNumber}-${accountDigit}`;
    } else if (accountNumber) {
      return accountNumber;
    }
    
    return cleanValue;
  };

  const handleAgencyChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: (...event: any[]) => void) => {
    const formattedValue = formatAgency(e.target.value);
    onChange(formattedValue);
  };

  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: (...event: any[]) => void) => {
    const formattedValue = formatAccount(e.target.value);
    onChange(formattedValue);
  };

  return (
    <Form {...form}>
      <form
        id="form-step-6"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="legalName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Razão Social *</FormLabel>
                <FormControl>
                  <Input placeholder="Legal name" {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="documentNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CNPJ/CPF *</FormLabel>
                <FormControl>
                  <Input placeholder="Document number" {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="accountType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo PF/PJ *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="PF">Pessoa Física</SelectItem>
                    <SelectItem value="PJ">Pessoa Jurídica</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bank"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Banco *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full bg-white">
                      <SelectValue placeholder="Select a bank" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {bankOptions.map((bank) => (
                      <SelectItem key={bank.value} value={bank.value}>
                        {bank.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="agency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Agência-dígito *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="0935-2" 
                    {...field} 
                    onChange={(e) => handleAgencyChange(e, field.onChange)}
                    className="bg-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="accountNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Conta-dígito *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="12345-6" 
                    {...field}
                    onChange={(e) => handleAccountChange(e, field.onChange)}
                    className="bg-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="accountType2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de conta *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="checking">Conta Corrente</SelectItem>
                    <SelectItem value="savings">Conta Poupança</SelectItem>
                    <SelectItem value="salary">Conta Salário</SelectItem>
                    <SelectItem value="investment">Conta Investimento</SelectItem>
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

export default BankInfoForm;
