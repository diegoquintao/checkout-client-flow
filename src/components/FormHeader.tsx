
import { FileText } from "lucide-react";

const FormHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex justify-center mb-4">
        <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center hover:bg-primary-hover transition-colors">
          <FileText className="h-8 w-8 text-white" />
        </div>
      </div>
      <h1 className="text-3xl font-bold text-blip-dark-gray mb-2">Checkout Client Registration</h1>
      <p className="text-blip-text-gray max-w-2xl mx-auto">
        Complete the form below to register your company for our payment checkout services. 
        All fields marked with an asterisk (*) are required.
      </p>
    </div>
  );
};

export default FormHeader;
