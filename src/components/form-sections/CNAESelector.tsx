import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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

interface CNAESelectorProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

const CNAESelector = ({ value, onValueChange, placeholder = "Select CNAE" }: CNAESelectorProps) => {
  const [cnaeOpen, setCnaeOpen] = useState(false);
  const [cnaeItems, setCnaeItems] = useState<CNAESubclasse[]>([]);
  const [cnaeSearchValue, setCnaeSearchValue] = useState("");
  const [isLoadingCnae, setIsLoadingCnae] = useState(false);

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

  // Filter CNAE items based on search
  const filteredCnaeItems = cnaeItems.filter(
    item => 
      item.id.toLowerCase().includes(cnaeSearchValue.toLowerCase()) || 
      item.descricao.toLowerCase().includes(cnaeSearchValue.toLowerCase())
  );

  // Get display text for selected CNAE
  const getSelectedCnaeDisplay = (value: string) => {
    const selectedItem = cnaeItems.find(item => item.id === value);
    return selectedItem ? `${selectedItem.id} - ${selectedItem.descricao}` : value;
  };

  return (
    <Popover open={cnaeOpen} onOpenChange={setCnaeOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={cnaeOpen}
          className="w-full justify-between border-blip-light-cyan bg-white text-left font-normal"
        >
          <span className="truncate">
            {value
              ? getSelectedCnaeDisplay(value)
              : isLoadingCnae ? "Loading CNAE..." : placeholder}
          </span>
        </Button>
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
                    onValueChange(item.id);
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
  );
};

export default CNAESelector;
