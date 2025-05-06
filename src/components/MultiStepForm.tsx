
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import CompanyInfoForm from "./form-sections/CompanyInfoForm";
import ContactInfoForm from "./form-sections/ContactInfoForm";
import FeesInfoForm from "./form-sections/FeesInfoForm";
import OperationInfoForm from "./form-sections/OperationInfoForm";
import ResponsibleInfoForm from "./form-sections/ResponsibleInfoForm";
import AddressInfoForm from "./form-sections/AddressInfoForm";
import BankInfoForm from "./form-sections/BankInfoForm";
import FormStepper from "./FormStepper";

const steps = [
  { id: 0, title: "Company", description: "Company Information" },
  { id: 1, title: "Responsible Person", description: "Responsible Individual" },
  { id: 2, title: "Contact", description: "Contact Details" },
  { id: 3, title: "Address", description: "Address Information" },
  { id: 4, title: "Banking", description: "Banking Details" },
  { id: 5, title: "Fees", description: "Fee Structure" },
  { id: 6, title: "Operation", description: "Operation Details" },
];

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    company: {},
    responsible: {},
    contact: {},
    address: {},
    banking: {},
    fees: {},
    operation: {},
  });

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmitSection = (sectionData: any, section: string) => {
    setFormData((prev) => ({
      ...prev,
      [section]: sectionData,
    }));
    
    if (currentStep < steps.length - 1) {
      handleNext();
    } else {
      handleSubmitForm();
    }
  };

  const handleSubmitForm = () => {
    // In a real app, you would send the data to the server here
    console.log("Form submitted!", formData);
    toast.success("Registration submitted successfully!", {
      description: "We will review your information and contact you soon.",
    });
  };

  const renderFormSection = () => {
    switch (currentStep) {
      case 0:
        return (
          <CompanyInfoForm
            initialData={formData.company}
            onSubmit={(data) => handleSubmitSection(data, 'company')}
          />
        );
      case 1:
        return (
          <ResponsibleInfoForm
            initialData={formData.responsible}
            onSubmit={(data) => handleSubmitSection(data, 'responsible')}
          />
        );
      case 2:
        return (
          <ContactInfoForm
            initialData={formData.contact}
            onSubmit={(data) => handleSubmitSection(data, 'contact')}
          />
        );
      case 3:
        return (
          <AddressInfoForm
            initialData={formData.address}
            onSubmit={(data) => handleSubmitSection(data, 'address')}
          />
        );
      case 4:
        return (
          <BankInfoForm
            initialData={formData.banking}
            onSubmit={(data) => handleSubmitSection(data, 'banking')}
          />
        );
      case 5:
        return (
          <FeesInfoForm
            initialData={formData.fees}
            onSubmit={(data) => handleSubmitSection(data, 'fees')}
          />
        );
      case 6:
        return (
          <OperationInfoForm
            initialData={formData.operation}
            onSubmit={(data) => handleSubmitSection(data, 'operation')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <FormStepper steps={steps} currentStep={currentStep} />
      
      <Card className="p-6 shadow-md mt-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            {steps[currentStep].title}
          </h2>
          <p className="text-gray-600">{steps[currentStep].description}</p>
          <Separator className="mt-4" />
        </div>

        {renderFormSection()}

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            Previous
          </Button>

          {currentStep !== steps.length - 1 && (
            <Button type="button" form={`form-step-${currentStep}`}>
              Continue
            </Button>
          )}

          {currentStep === steps.length - 1 && (
            <Button type="submit" form={`form-step-${currentStep}`}>
              Submit Registration
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default MultiStepForm;
