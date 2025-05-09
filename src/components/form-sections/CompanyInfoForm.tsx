
import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

// Mock CNAE data structure
interface CNAEItem {
  code: string;
  description: string;
}

const mockCNAEData: CNAEItem[] = [
  { code: "01.11-3", description: "Cultivo de cereais" },
  { code: "01.12-1", description: "Cultivo de algodão herbáceo e outras fibras" },
  { code: "01.13-0", description: "Cultivo de cana-de-açúcar" },
  { code: "01.14-8", description: "Cultivo de fumo" },
  { code: "01.15-6", description: "Cultivo de soja" },
  { code: "01.16-4", description: "Cultivo de oleaginosas" },
  { code: "01.19-9", description: "Cultivo de plantas de lavoura temporária não especificadas" },
  { code: "01.21-1", description: "Horticultura" },
  { code: "01.22-9", description: "Cultivo de flores e plantas ornamentais" },
  { code: "01.31-8", description: "Cultivo de laranja" },
  { code: "01.32-6", description: "Cultivo de uva" },
  { code: "01.33-4", description: "Cultivo de frutas de lavoura permanente" },
  { code: "01.34-2", description: "Cultivo de café" },
  { code: "01.35-1", description: "Cultivo de cacau" },
  { code: "01.39-3", description: "Cultivo de plantas de lavoura permanente não especificadas" },
];

const formSchema = z.object({
  fantasyName: z.string().min(1, { message: "Fantasy name is required" }),
  legalName: z.string().min(1, { message: "Legal name is required" }),
  documentNumber: z.string().length(18, { message: "CNPJ must be in format 00.000.000/0001-00" })
    .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, { message: "Invalid CNPJ format" }),
  establishmentType: z.string().min(1, { message: "Establishment type is required" }),
  cnae: z.string().min(1, { message: "CNAE/MCC is required" }),
  openingDate: z.date({
    required_error: "Opening date is required",
  }),
});

interface CompanyInfoFormProps {
  initialData: any;
  onSubmit: (data: z.infer<typeof formSchema>) => void;
}

const CompanyInfoForm = ({ initialData = {}, onSubmit }: CompanyInfoFormProps) => {
  const [cnaeOpen, setCnaeOpen] = useState(false);
  const [cnaeItems, setCnaeItems] = useState<CNAEItem[]>(mockCNAEData);
  const [cnaeSearchValue, setCnaeSearchValue] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fantasyName: initialData.fantasyName || "",
      legalName: initialData.legalName || "",
      documentNumber: initialData.documentNumber || "",
      establishmentType: initialData.establishmentType || "",
      cnae: initialData.cnae || "",
      openingDate: initialData.openingDate || undefined,
    },
  });

  // Format CNPJ as user types
  const formatCNPJ = (value: string) => {
    if (!value) return value;
    
    const onlyNumbers = value.replace(/\D/g, "").substring(0, 14);
    
    if (onlyNumbers.length <= 2) {
      return onlyNumbers;
    }
    if (onlyNumbers.length <= 5) {
      return `${onlyNumbers.substring(0, 2)}.${onlyNumbers.substring(2)}`;
    }
    if (onlyNumbers.length <= 8) {
      return `${onlyNumbers.substring(0, 2)}.${onlyNumbers.substring(2, 5)}.${onlyNumbers.substring(5)}`;
    }
    if (onlyNumbers.length <= 12) {
      return `${onlyNumbers.substring(0, 2)}.${onlyNumbers.substring(2, 5)}.${onlyNumbers.substring(5, 8)}/${onlyNumbers.substring(8)}`;
    }
    return `${onlyNumbers.substring(0, 2)}.${onlyNumbers.substring(2, 5)}.${onlyNumbers.substring(5, 8)}/${onlyNumbers.substring(8, 12)}-${onlyNumbers.substring(12, 14)}`;
  };

  // Filter CNAE items based on search
  useEffect(() => {
    if (cnaeSearchValue) {
      const filtered = mockCNAEData.filter(
        item => 
          item.code.toLowerCase().includes(cnaeSearchValue.toLowerCase()) || 
          item.description.toLowerCase().includes(cnaeSearchValue.toLowerCase())
      );
      setCnaeItems(filtered);
    } else {
      setCnaeItems(mockCNAEData);
    }
  }, [cnaeSearchValue]);

  const handleCNPJChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: (...event: any[]) => void) => {
    const formattedValue = formatCNPJ(e.target.value);
    onChange(formattedValue);
  };

  return (
    <Form {...form}>
      <form
        id="form-step-0"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="fantasyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-blip-text-gray font-medium">Nome Fantasia *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your business name"
                    {...field}
                    className="border-blip-light-cyan focus:border-primary focus:ring-primary bg-white"
                  />
                </FormControl>
                <FormMessage className="text-blip-error" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="legalName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-blip-text-gray font-medium">Cliente/Razão Social *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Legal name of company" 
                    {...field} 
                    className="border-blip-light-cyan focus:border-primary focus:ring-primary bg-white"
                  />
                </FormControl>
                <FormMessage className="text-blip-error" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="documentNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-blip-text-gray font-medium">CNPJ *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="00.000.000/0001-00" 
                    {...field} 
                    onChange={(e) => handleCNPJChange(e, field.onChange)}
                    className="border-blip-light-cyan focus:border-primary focus:ring-primary bg-white"
                  />
                </FormControl>
                <FormMessage className="text-blip-error" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="establishmentType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-blip-text-gray font-medium">Tipo de Estabelecimento *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g. Retail, Service" 
                    {...field} 
                    className="border-blip-light-cyan focus:border-primary focus:ring-primary bg-white"
                  />
                </FormControl>
                <FormMessage className="text-blip-error" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cnae"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-blip-text-gray font-medium">CNAE / MCC *</FormLabel>
                <Popover open={cnaeOpen} onOpenChange={setCnaeOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={cnaeOpen}
                        className="w-full justify-between border-blip-light-cyan bg-white"
                      >
                        {field.value
                          ? cnaeItems.find((item) => `${item.code} - ${item.description}` === field.value)?.description || field.value
                          : "Select CNAE"}
                        <CalendarIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="start">
                    <Command>
                      <CommandInput 
                        placeholder="Search CNAE..." 
                        value={cnaeSearchValue}
                        onValueChange={setCnaeSearchValue}
                      />
                      <CommandList>
                        <CommandEmpty>No CNAE found.</CommandEmpty>
                        <CommandGroup>
                          {cnaeItems.map((item) => (
                            <CommandItem
                              key={item.code}
                              value={`${item.code} - ${item.description}`}
                              onSelect={(currentValue) => {
                                form.setValue("cnae", currentValue);
                                setCnaeOpen(false);
                              }}
                            >
                              <span className="text-sm font-medium">{item.code}</span>
                              <span className="ml-2 text-sm text-muted-foreground">{item.description}</span>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage className="text-blip-error" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="openingDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-blip-text-gray font-medium">Data de Abertura</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal border-blip-light-cyan bg-white",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Select opening date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                      className="border-blip-light-cyan"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage className="text-blip-error" />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export default CompanyInfoForm;
