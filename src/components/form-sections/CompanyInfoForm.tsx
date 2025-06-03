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

// CNAE API data structure
interface CNAESubclasse {
  id: string;
  descricao: string;
  observacoes?: string[];
}

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
  const [cnaeItems, setCnaeItems] = useState<CNAESubclasse[]>([]);
  const [cnaeSearchValue, setCnaeSearchValue] = useState("");
  const [isLoadingCnae, setIsLoadingCnae] = useState(false);

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

  // Fetch CNAE data from IBGE API and remove duplicates
  const fetchCnaeData = async () => {
    setIsLoadingCnae(true);
    try {
      const response = await fetch('https://servicodados.ibge.gov.br/api/v2/cnae/subclasses');
      const data = await response.json();
      
      // Remove duplicates based on ID and keep unique subclasses
      const uniqueSubclasses = data.reduce((acc: CNAESubclasse[], current: CNAESubclasse) => {
        const existingItem = acc.find(item => item.id === current.id);
        if (!existingItem) {
          acc.push(current);
        }
        return acc;
      }, []);
      
      setCnaeItems(uniqueSubclasses);
      console.log('CNAE data loaded:', uniqueSubclasses.length, 'unique items');
    } catch (error) {
      console.error('Error fetching CNAE data:', error);
      setCnaeItems([]);
    } finally {
      setIsLoadingCnae(false);
    }
  };

  // Load CNAE data on component mount
  useEffect(() => {
    fetchCnaeData();
  }, []);

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
  const filteredCnaeItems = cnaeItems.filter(
    item => 
      item.id.toLowerCase().includes(cnaeSearchValue.toLowerCase()) || 
      item.descricao.toLowerCase().includes(cnaeSearchValue.toLowerCase())
  );

  const handleCNPJChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: (...event: any[]) => void) => {
    const formattedValue = formatCNPJ(e.target.value);
    onChange(formattedValue);
  };

  // Get display text for selected CNAE
  const getSelectedCnaeDisplay = (value: string) => {
    const selectedItem = cnaeItems.find(item => item.id === value);
    return selectedItem ? `${selectedItem.id} - ${selectedItem.descricao}` : value;
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
                        className="w-full justify-between border-blip-light-cyan bg-white text-left font-normal"
                      >
                        <span className="truncate">
                          {field.value
                            ? getSelectedCnaeDisplay(field.value)
                            : isLoadingCnae ? "Loading CNAE..." : "Select CNAE"}
                        </span>
                        <CalendarIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0 bg-white" align="start">
                    <Command>
                      <CommandInput 
                        placeholder="Search CNAE..." 
                        value={cnaeSearchValue}
                        onValueChange={setCnaeSearchValue}
                      />
                      <CommandList>
                        <CommandEmpty>
                          {isLoadingCnae ? "Loading..." : "No CNAE found."}
                        </CommandEmpty>
                        <CommandGroup>
                          {filteredCnaeItems.map((item) => (
                            <CommandItem
                              key={item.id}
                              value={`${item.id} ${item.descricao}`}
                              onSelect={() => {
                                form.setValue("cnae", item.id);
                                setCnaeOpen(false);
                              }}
                              className="flex flex-col items-start p-3"
                            >
                              <div className="flex items-center w-full">
                                <span className="text-sm font-bold text-blue-600 mr-2">{item.id}</span>
                                <span className="text-sm text-gray-700 flex-1">{item.descricao}</span>
                              </div>
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
