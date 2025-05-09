
import MultiStepForm from "@/components/MultiStepForm";
import FormHeader from "@/components/FormHeader";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-carbona">
      <div className="container mx-auto px-4 py-8">
        <FormHeader />
        <MultiStepForm />
      </div>
    </div>
  );
};

export default Index;
