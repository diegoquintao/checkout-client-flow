
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Banknote } from "lucide-react";
import { useState, useEffect } from "react";
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
import { brazilianBanks } from "@/utils/bankData";

const formSchema = z.object({
  legalName: z.string().min(1, { message: "Legal name is required" }),
  documentNumber: z.string().min(1, { message: "CNPJ/CPF is required" }),
  accountType: z.string().min(1, { message: "Account type is required" }),
  bank: z.string().min(1, { message: "Bank is required" }),
  bankCode: z.string().min(1, { message: "Bank code is required" }),
  agency: z.string().min(1, { message: "Agency is required" }),
  agencyDigit: z.string().optional(),
  accountNumber: z.string().min(1, { message: "Account number is required" }),
  accountDigit: z.string().min(1, { message: "Account digit is required" }),
  accountType2: z.string().min(1, { message: "Account type is required" }),
});

interface BankInfoFormProps {
  initialData: any;
  onSubmit: (data: z.infer<typeof formSchema>) => void;
}

const BankInfoForm = ({ initialData = {}, onSubmit }: BankInfoFormProps) => {
  const [selectedBank, setSelectedBank] = useState(initialData.bank || "");
  const [selectedBankCode, setSelectedBankCode] = useState(initialData.bankCode || "");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      legalName: initialData.legalName || "",
      documentNumber: initialData.documentNumber || "",
      accountType: initialData.accountType || "",
      bank: initialData.bank || "",
      bankCode: initialData.bankCode || "",
      agency: initialData.agency || "",
      agencyDigit: initialData.agencyDigit || "",
      accountNumber: initialData.accountNumber || "",
      accountDigit: initialData.accountDigit || "",
      accountType2: initialData.accountType2 || "",
    },
  });

  // Update bank code when bank selection changes
  const handleBankChange = (bankName: string) => {
    const selectedBank = brazilianBanks.find(bank => bank.name === bankName);
    if (selectedBank) {
      setSelectedBank(bankName);
      setSelectedBankCode(selectedBank.code);
      form.setValue("bank", bankName);
      form.setValue("bankCode", selectedBank.code);
    }
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
                  <Input placeholder="Legal name" {...field} />
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
                  <Input placeholder="Document number" {...field} />
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
                    <SelectTrigger>
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
                  onValueChange={handleBankChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a bank" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {brazilianBanks.map((bank) => (
                      <SelectItem key={bank.code} value={bank.name}>
                        {bank.name}
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
            name="bankCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Bank code" 
                    {...field} 
                    value={selectedBankCode || field.value}
                    readOnly
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="agency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Agência *</FormLabel>
                <FormControl>
                  <Input placeholder="Agency number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="agencyDigit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dígito da Agência</FormLabel>
                <FormControl>
                  <Input placeholder="Agency verification digit" {...field} />
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
                <FormLabel>Conta *</FormLabel>
                <FormControl>
                  <Input placeholder="Account number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="accountDigit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dígito da Conta *</FormLabel>
                <FormControl>
                  <Input placeholder="Account verification digit" {...field} />
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
                    <SelectTrigger>
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
