import React, { useState } from 'react';

/**
 * SearchableDropdown
 * Props:
 * - options: array of strings
 * - value: selected value
 * - onChange: function(newValue)
 * - placeholder: string
 * - label: string (optional)
 * - disabled: boolean (optional)
 */
export default function SearchableDropdown({ options = [], value, onChange, placeholder, label, disabled }) {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);

  // Filter options by search
  const filtered = options.filter(opt =>
    opt.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative w-full">
      {label && <label className="block text-sm font-medium mb-2">{label}</label>}
      <div className="w-full">
        <input
          type="text"
          value={search}
          onChange={e => { setSearch(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder={placeholder || 'Search...'}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-prime focus:border-prime outline-none"
          disabled={disabled}
        />
      </div>
      {open && (
        <ul className="absolute z-10 bg-white border border-gray-300 rounded-lg mt-1 w-full max-h-48 overflow-auto shadow-lg">
          {filtered.length === 0 && (
            <li className="px-4 py-2 text-gray-400">No options</li>
          )}
          {filtered.map(opt => (
            <li
              key={opt}
              className={`px-4 py-2 cursor-pointer hover:bg-prime hover:text-white ${opt === value ? 'bg-prime text-white' : ''}`}
              onMouseDown={() => {
                onChange(opt);
                setSearch(opt);
                setOpen(false);
              }}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
