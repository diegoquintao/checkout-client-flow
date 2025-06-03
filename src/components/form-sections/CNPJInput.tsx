
import { Input } from "@/components/ui/input";

interface CNPJInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const CNPJInput = ({ value, onChange, placeholder = "00.000.000/0001-00", className }: CNPJInputProps) => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCNPJ(e.target.value);
    onChange(formattedValue);
  };

  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      className={className}
    />
  );
};

export default CNPJInput;
