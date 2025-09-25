import Calculator from '@/components/Calculator';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-main flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Calculator</h1>
          <p className="text-muted-foreground">Modern • Elegant • Functional</p>
        </div>
        <Calculator />
        <div className="text-center mt-6 text-sm text-muted-foreground">
          Use your keyboard for quick calculations
        </div>
      </div>
    </div>
  );
};

export default Index;
