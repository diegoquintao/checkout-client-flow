
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { MapPin, Search } from "lucide-react";
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
import { useState } from "react";
import { toast } from "sonner";

const formSchema = z.object({
  zipCode: z.string().min(1, { message: "CEP é obrigatório" }),
  street: z.string().min(1, { message: "Rua é obrigatória" }),
  number: z.string().min(1, { message: "Número é obrigatório" }),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, { message: "Bairro é obrigatório" }),
  city: z.string().min(1, { message: "Cidade é obrigatória" }),
  state: z.string().min(1, { message: "Estado é obrigatório" }),
  country: z.string().min(1, { message: "País é obrigatório" }),
});

interface AddressInfoFormProps {
  initialData: any;
  onSubmit: (data: z.infer<typeof formSchema>) => void;
}

const AddressInfoForm = ({ initialData = {}, onSubmit }: AddressInfoFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      zipCode: initialData.zipCode || "",
      street: initialData.street || "",
      number: initialData.number || "",
      complement: initialData.complement || "",
      neighborhood: initialData.neighborhood || "",
      city: initialData.city || "",
      state: initialData.state || "",
      country: initialData.country || "BR", // Default to Brazil
    },
  });

  const fetchAddressData = async (cep: string) => {
    if (!cep || cep.length < 8) return;
    
    const cepClean = cep.replace(/\D/g, '');
    
    if (cepClean.length !== 8) {
      toast.error("CEP inválido", {
        description: "O CEP deve conter 8 dígitos",
      });
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`https://viacep.com.br/ws/${cepClean}/json/`);
      const data = await response.json();

      if (data.erro) {
        toast.error("CEP não encontrado", {
          description: "Verifique o CEP e tente novamente",
        });
        return;
      }
      
      // Update form fields with received data
      form.setValue("street", data.logradouro || "");
      form.setValue("neighborhood", data.bairro || "");
      form.setValue("city", data.localidade || "");
      form.setValue("state", data.uf || "");
      form.setValue("country", "BR"); // Brazil by default for BR CEP

      toast.success("Endereço encontrado!", {
        description: "Os campos foram preenchidos automaticamente",
      });
    } catch (error) {
      console.error("Error fetching CEP data:", error);
      toast.error("Erro ao buscar o endereço", {
        description: "Tente novamente ou preencha manualmente",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle CEP search when the user finishes typing
  const handleCepChange = (value: string) => {
    if (value.length >= 8) {
      fetchAddressData(value);
    }
  };

  // Handle CEP search button click
  const handleSearchClick = () => {
    const cep = form.getValues("zipCode");
    fetchAddressData(cep);
  };

  return (
    <Form {...form}>
      <form
        id="form-step-3"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CEP/ZIP Code field - now first */}
          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium text-blip-text-gray">CEP *</FormLabel>
                <FormControl>
                  <div className="flex">
                    <Input
                      placeholder="00000-000"
                      {...field}
                      className="rounded-r-none border-r-0 transition-all focus-visible:ring-blip-primary"
                      onChange={(e) => {
                        field.onChange(e);
                        handleCepChange(e.target.value);
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleSearchClick}
                      className="flex items-center px-3 bg-blip-primary hover:bg-blip-primary-hover text-white rounded-r-md border border-blip-primary transition-colors"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      ) : (
                        <Search className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Street field */}
          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium text-blip-text-gray">Rua/Av. *</FormLabel>
                <FormControl>
                  <div className="flex">
                    <div className="flex items-center px-3 bg-gray-50 border border-r-0 rounded-l-md border-blip-light-cyan">
                      <MapPin className="h-4 w-4 text-blip-primary" />
                    </div>
                    <Input
                      placeholder="Nome da rua"
                      {...field}
                      className="rounded-l-none transition-all focus-visible:ring-blip-primary"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="number"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium text-blip-text-gray">Número *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="123" 
                    {...field} 
                    className="transition-all focus-visible:ring-blip-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="complement"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium text-blip-text-gray">Complemento</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Apartamento, sala, etc." 
                    {...field} 
                    className="transition-all focus-visible:ring-blip-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="neighborhood"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium text-blip-text-gray">Bairro *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Bairro" 
                    {...field} 
                    className="transition-all focus-visible:ring-blip-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium text-blip-text-gray">Cidade *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Cidade" 
                    {...field} 
                    className="transition-all focus-visible:ring-blip-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium text-blip-text-gray">Estado *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="border-blip-light-cyan focus:ring-blip-primary">
                      <SelectValue placeholder="Selecione o estado" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white border-blip-light-cyan">
                    <SelectItem value="AC">Acre</SelectItem>
                    <SelectItem value="AL">Alagoas</SelectItem>
                    <SelectItem value="AP">Amapá</SelectItem>
                    <SelectItem value="AM">Amazonas</SelectItem>
                    <SelectItem value="BA">Bahia</SelectItem>
                    <SelectItem value="CE">Ceará</SelectItem>
                    <SelectItem value="DF">Distrito Federal</SelectItem>
                    <SelectItem value="ES">Espírito Santo</SelectItem>
                    <SelectItem value="GO">Goiás</SelectItem>
                    <SelectItem value="MA">Maranhão</SelectItem>
                    <SelectItem value="MT">Mato Grosso</SelectItem>
                    <SelectItem value="MS">Mato Grosso do Sul</SelectItem>
                    <SelectItem value="MG">Minas Gerais</SelectItem>
                    <SelectItem value="PA">Pará</SelectItem>
                    <SelectItem value="PB">Paraíba</SelectItem>
                    <SelectItem value="PR">Paraná</SelectItem>
                    <SelectItem value="PE">Pernambuco</SelectItem>
                    <SelectItem value="PI">Piauí</SelectItem>
                    <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                    <SelectItem value="RN">Rio Grande do Norte</SelectItem>
                    <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                    <SelectItem value="RO">Rondônia</SelectItem>
                    <SelectItem value="RR">Roraima</SelectItem>
                    <SelectItem value="SC">Santa Catarina</SelectItem>
                    <SelectItem value="SP">São Paulo</SelectItem>
                    <SelectItem value="SE">Sergipe</SelectItem>
                    <SelectItem value="TO">Tocantins</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium text-blip-text-gray">País *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="border-blip-light-cyan focus:ring-blip-primary">
                      <SelectValue placeholder="Selecione o país" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white border-blip-light-cyan">
                    <SelectItem value="BR">Brasil</SelectItem>
                    <SelectItem value="US">Estados Unidos</SelectItem>
                    <SelectItem value="PT">Portugal</SelectItem>
                    <SelectItem value="AR">Argentina</SelectItem>
                    <SelectItem value="CL">Chile</SelectItem>
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

export default AddressInfoForm;
