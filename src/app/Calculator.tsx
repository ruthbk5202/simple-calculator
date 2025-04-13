"use client";
import React, { useState } from 'react';
import './calculator.css';

const Calculator: React.FC = () => {
  const [input, setInput] = useState<string>('0');
  const [previousInput, setPreviousInput] = useState<string>('');
  const [operator, setOperator] = useState<string | null>(null);

  const handleNumberClick = (num: string) => {
    if (input === '0' || operator === '=') {
      setInput(num);
      if (operator === '=') {
        setPreviousInput('');
        setOperator(null);
      }
    } else {
      setInput(input + num);
    }
  };

  const handleOperatorClick = (op: string) => {
    if (operator && operator !== '=' && previousInput) {
      calculate();
    }
    setPreviousInput(input);
    setOperator(op);
    setInput('0');
  };

  const calculate = () => {
    if (!operator || !previousInput) return;

    const prev = parseFloat(previousInput);
    const current = parseFloat(input);
    let result = 0;

    switch (operator) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '×':
        result = prev * current;
        break;
      case '÷':
        result = prev / current;
        break;
      default:
        return;
    }

    setInput(result.toString());
    setPreviousInput('');
    setOperator('=');
  };

  const handleClear = () => {
    setInput('0');
    setPreviousInput('');
    setOperator(null);
  };

  const handleDecimal = () => {
    if (input.includes('.')) return;
    setInput(input + '.');
  };

  const handlePercentage = () => {
    setInput((parseFloat(input) / 100).toString());
  };

  const handleToggleSign = () => {
    setInput((parseFloat(input) * -1).toString());
  };

  return (
    <div className="calculator">
      <div className="display">
        <div className="previous">{previousInput} {operator}</div>
        <div className="current">{input}</div>
      </div>
      <div className="buttons">
        <button className="span-2" onClick={handleClear}>AC</button>
        <button onClick={handleToggleSign}>+/-</button>
        <button onClick={handlePercentage}>%</button>
        <button className="operator" onClick={() => handleOperatorClick('÷')}>÷</button>
        
        <button onClick={() => handleNumberClick('7')}>7</button>
        <button onClick={() => handleNumberClick('8')}>8</button>
        <button onClick={() => handleNumberClick('9')}>9</button>
        <button className="operator" onClick={() => handleOperatorClick('×')}>×</button>
        
        <button onClick={() => handleNumberClick('4')}>4</button>
        <button onClick={() => handleNumberClick('5')}>5</button>
        <button onClick={() => handleNumberClick('6')}>6</button>
        <button className="operator" onClick={() => handleOperatorClick('-')}>-</button>
        
        <button onClick={() => handleNumberClick('1')}>1</button>
        <button onClick={() => handleNumberClick('2')}>2</button>
        <button onClick={() => handleNumberClick('3')}>3</button>
        <button className="operator" onClick={() => handleOperatorClick('+')}>+</button>
        
        <button className="span-2" onClick={() => handleNumberClick('0')}>0</button>
        <button onClick={handleDecimal}>.</button>
        <button className="operator" onClick={calculate}>=</button>
      </div>
    </div>
  );
};

export default Calculator;
