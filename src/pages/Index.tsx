import Calculator from '@/components/Calculator';

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-foreground mb-1">Calculator</h1>
          <p className="text-sm text-muted-foreground">Simple & Clean</p>
        </div>
        <Calculator />
        <div className="text-center mt-4 text-xs text-muted-foreground">
          Keyboard shortcuts supported
        </div>
      </div>
    </div>
  );
};

export default Index;
