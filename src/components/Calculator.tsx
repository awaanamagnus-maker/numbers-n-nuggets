import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type CalculatorState = {
  display: string;
  previousValue: string;
  operation: string | null;
  waitingForOperand: boolean;
};

const Calculator = () => {
  const [state, setState] = useState<CalculatorState>({
    display: '0',
    previousValue: '',
    operation: null,
    waitingForOperand: false,
  });

  const inputNumber = (num: string) => {
    if (state.waitingForOperand) {
      setState(prev => ({
        ...prev,
        display: num,
        waitingForOperand: false,
      }));
    } else {
      setState(prev => ({
        ...prev,
        display: prev.display === '0' ? num : prev.display + num,
      }));
    }
  };

  const inputDecimal = () => {
    if (state.waitingForOperand) {
      setState(prev => ({
        ...prev,
        display: '0.',
        waitingForOperand: false,
      }));
    } else if (state.display.indexOf('.') === -1) {
      setState(prev => ({
        ...prev,
        display: prev.display + '.',
      }));
    }
  };

  const clear = () => {
    setState({
      display: '0',
      previousValue: '',
      operation: null,
      waitingForOperand: false,
    });
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(state.display);

    if (state.previousValue === '') {
      setState(prev => ({
        ...prev,
        previousValue: String(inputValue),
        operation: nextOperation,
        waitingForOperand: true,
      }));
    } else if (state.operation) {
      const currentValue = parseFloat(state.previousValue);
      let result = currentValue;

      switch (state.operation) {
        case '+':
          result = currentValue + inputValue;
          break;
        case '-':
          result = currentValue - inputValue;
          break;
        case '×':
          result = currentValue * inputValue;
          break;
        case '÷':
          result = currentValue / inputValue;
          break;
        default:
          return;
      }

      setState(prev => ({
        ...prev,
        display: String(result),
        previousValue: String(result),
        operation: nextOperation,
        waitingForOperand: true,
      }));
    }
  };

  const calculate = () => {
    performOperation('');
    setState(prev => ({
      ...prev,
      operation: null,
      previousValue: '',
      waitingForOperand: true,
    }));
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const { key } = event;
      
      if (key >= '0' && key <= '9') {
        inputNumber(key);
      } else if (key === '.') {
        inputDecimal();
      } else if (key === '+') {
        performOperation('+');
      } else if (key === '-') {
        performOperation('-');
      } else if (key === '*') {
        performOperation('×');
      } else if (key === '/') {
        event.preventDefault();
        performOperation('÷');
      } else if (key === 'Enter' || key === '=') {
        calculate();
      } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clear();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [state]);

  const CalcButton = ({ 
    children, 
    onClick, 
    variant = 'number',
    className = '',
    ...props 
  }: {
    children: React.ReactNode;
    onClick: () => void;
    variant?: 'number' | 'operator' | 'clear';
    className?: string;
  }) => {
    const getVariantStyles = () => {
      switch (variant) {
        case 'operator':
          return 'bg-calc-operator hover:bg-calc-operator-hover text-white font-medium';
        case 'clear':
          return 'bg-calc-number hover:bg-calc-number-hover text-calc-text font-medium';
        default:
          return 'bg-calc-number hover:bg-calc-number-hover text-calc-text';
      }
    };

    return (
      <Button
        onClick={onClick}
        className={cn(
          'h-14 text-lg rounded-xl border-0 shadow-button',
          'transition-all duration-150 ease-out',
          'hover:scale-[1.02] active:scale-[0.98]',
          'focus:outline-none focus:ring-2 focus:ring-accent/20',
          getVariantStyles(),
          className
        )}
        {...props}
      >
        {children}
      </Button>
    );
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-calc-bg p-6 rounded-2xl shadow-soft border border-border">
      {/* Display */}
      <div className="bg-calc-display p-5 rounded-xl mb-5">
        <div className="text-right">
          <div className="text-3xl font-light text-calc-text tracking-wide">
            {state.display}
          </div>
        </div>
      </div>

      {/* Buttons Grid */}
      <div className="grid grid-cols-4 gap-2">
        {/* First Row */}
        <CalcButton variant="clear" onClick={clear} className="col-span-3">
          Clear
        </CalcButton>
        <CalcButton variant="operator" onClick={() => performOperation('÷')}>
          ÷
        </CalcButton>

        {/* Second Row */}
        <CalcButton onClick={() => inputNumber('7')}>7</CalcButton>
        <CalcButton onClick={() => inputNumber('8')}>8</CalcButton>
        <CalcButton onClick={() => inputNumber('9')}>9</CalcButton>
        <CalcButton variant="operator" onClick={() => performOperation('×')}>
          ×
        </CalcButton>

        {/* Third Row */}
        <CalcButton onClick={() => inputNumber('4')}>4</CalcButton>
        <CalcButton onClick={() => inputNumber('5')}>5</CalcButton>
        <CalcButton onClick={() => inputNumber('6')}>6</CalcButton>
        <CalcButton variant="operator" onClick={() => performOperation('-')}>
          −
        </CalcButton>

        {/* Fourth Row */}
        <CalcButton onClick={() => inputNumber('1')}>1</CalcButton>
        <CalcButton onClick={() => inputNumber('2')}>2</CalcButton>
        <CalcButton onClick={() => inputNumber('3')}>3</CalcButton>
        <CalcButton variant="operator" onClick={() => performOperation('+')}>
          +
        </CalcButton>

        {/* Fifth Row */}
        <CalcButton onClick={() => inputNumber('0')} className="col-span-2">
          0
        </CalcButton>
        <CalcButton onClick={inputDecimal}>.</CalcButton>
        <CalcButton variant="operator" onClick={calculate}>
          =
        </CalcButton>
      </div>
    </div>
  );
};

export default Calculator;