import React, { useState, useEffect, useRef } from 'react';
import './ChipComponent.css';

const ChipComponent = ({ items }) => {
  const [inputValue, setInputValue] = useState('');
  const [chipItems, setChipItems] = useState([]);
  const [listItems, setListItems] = useState(items);
  const [highlightedChip, setHighlightedChip] = useState(null);
  const inputRef = useRef();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Backspace' && inputValue === '') {
        if (highlightedChip !== null) {
          handleDeleteChip(highlightedChip);
          setHighlightedChip(null);
        } else if (chipItems.length > 0) {
          setHighlightedChip(chipItems[chipItems.length - 1]);
        }
      } else {
        setHighlightedChip(null);
      }
    };

    inputRef.current.addEventListener('keydown', handleKeyDown);
    return () => {
      inputRef.current.removeEventListener('keydown', handleKeyDown);
    };
  }, [inputValue, chipItems, highlightedChip]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setListItems(items.filter(item => item.toLowerCase().includes(e.target.value.toLowerCase()) && !chipItems.includes(item)));
  };

  const handleItemClick = (item) => {
    setChipItems([...chipItems, item]);
    setListItems(listItems.filter(i => i !== item));
    setInputValue('');
  };

  const handleDeleteChip = (chip) => {
    setChipItems(chipItems.filter(c => c !== chip));
    setListItems([...listItems, chip]);
  };

  return (
    <div className="chip-container">
      {chipItems.map((chip, index) => (
        <div key={index} className={`chip ${chip === highlightedChip ? 'highlighted' : ''}`}>
          {chip}
          <span onClick={() => handleDeleteChip(chip)}>X</span>
        </div>
      ))}
      <div className="input-field">
        <input 
          ref={inputRef}
          value={inputValue} 
          onChange={handleInputChange} 
          placeholder="Add Person's name or press space to see all..."
        />
        {inputValue && listItems.map((item, index) => (
          <div key={index} className="list-item" onClick={() => handleItemClick(item)}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );  
};

export default ChipComponent;
