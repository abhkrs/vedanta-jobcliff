'use client'
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, X } from 'lucide-react';

export default function SearchableMultiSelect({ 
  options = [], 
  selectedValues = [], 
  onChange, 
  placeholder = 'Select...', 
  label = '',
  disabled = false,
  className = '' 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  // Filter options: exclude already selected and match search term
  const filteredOptions = options.filter(option => 
    !selectedValues.includes(option) && 
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange([...selectedValues, option]);
    setSearchTerm('');
  };

  const handleRemove = (option) => {
    onChange(selectedValues.filter(v => v !== option));
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {label && <label className="block text-sm font-medium mb-2">{label} ({selectedValues.length})</label>}
      
      {/* Selected Items */}
      {selectedValues.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedValues.map((value, index) => (
            <span key={index} className="px-3 bg-prime/10 text-prime rounded-full text-sm flex items-center gap-1">
              {value}
              <button 
                type="button"
                onClick={() => handleRemove(value)} 
                className="text-prime hover:text-red-500"
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Main Select Button */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full px-4 py-2 border border-gray-300 rounded-lg text-left flex items-center justify-between focus:ring-2 focus:ring-prime focus:border-prime outline-none ${
          disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
        }`}
      >
        <span className="text-gray-400">{placeholder}</span>
        <ChevronDown size={18} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-hidden">
          {/* Search Input */}
          <div className="p-2 border-b border-gray-200 sticky top-0 bg-white">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-prime focus:border-prime outline-none"
                autoFocus
              />
            </div>
          </div>

          {/* Options List */}
          <div className="overflow-y-auto max-h-48">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <div
                  key={index}
                  onClick={() => handleSelect(option)}
                  className="px-4 py-2 cursor-pointer hover:bg-prime/10"
                >
                  {option}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-400 text-sm">
                {selectedValues.length === options.length ? 'All selected' : 'No results found'}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

