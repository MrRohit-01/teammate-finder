import React, { useState, useRef, useEffect } from 'react';
import { X, Check, ChevronDown } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  className?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select options',
  label,
  error,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  
  const filteredOptions = options.filter(option => 
    option.label.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !value.includes(option.value)
  );
  
  const selectedOptions = options.filter(option => 
    value.includes(option.value)
  );
  
  const toggleOpen = () => setIsOpen(!isOpen);
  
  const handleSelect = (optionValue: string) => {
    onChange([...value, optionValue]);
    setSearchTerm('');
  };
  
  const handleRemove = (optionValue: string) => {
    onChange(value.filter(v => v !== optionValue));
  };
  
  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current && 
      !containerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };
  
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <div
        className={`
          border rounded-md py-1 px-2 flex flex-wrap items-center min-h-[38px] cursor-pointer
          ${error ? 'border-red-300' : 'border-gray-300'}
          ${isOpen ? 'ring-1 ring-indigo-500 border-indigo-500' : ''}
        `}
        onClick={() => setIsOpen(true)}
      >
        {selectedOptions.length === 0 && !searchTerm && (
          <span className="text-gray-500 text-sm py-1">{placeholder}</span>
        )}
        
        {selectedOptions.map(option => (
          <span
            key={option.value}
            className="inline-flex items-center m-1 px-2 py-0.5 rounded text-sm font-medium bg-indigo-100 text-indigo-800"
          >
            {option.label}
            <button
              type="button"
              className="ml-1 inline-flex text-indigo-400 hover:text-indigo-600 focus:outline-none"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove(option.value);
              }}
            >
              <X size={14} />
            </button>
          </span>
        ))}
        
        {isOpen && (
          <input
            type="text"
            className="flex-grow border-none focus:ring-0 focus:outline-none text-sm p-0 h-7"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
            onClick={(e) => e.stopPropagation()}
          />
        )}
        
        <span className="ml-auto">
          <ChevronDown 
            size={18} 
            className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          />
        </span>
      </div>
      
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg max-h-60 overflow-auto">
          <ul className="py-1 text-base">
            {filteredOptions.length === 0 ? (
              <li className="px-3 py-2 text-gray-500 text-sm">No options found</li>
            ) : (
              filteredOptions.map(option => (
                <li
                  key={option.value}
                  className="px-3 py-2 flex items-center text-sm hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelect(option.value)}
                >
                  <span className="flex-grow">{option.label}</span>
                  <Check 
                    size={16} 
                    className="text-indigo-600 opacity-0"
                  />
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MultiSelect;