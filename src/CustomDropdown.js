import { useState, useRef, useEffect } from 'react';
import './CustomDropdown.css';

const CustomDropdown = ({ title, options, selectedOptions, onSelect, onClear }) => {
  const [isOpen, setIsOpen] = useState(false);
  const searchInputRef = useRef(null);

  const handleOptionClick = (option) => {
    onSelect(option);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClearClick = () => {
    onClear();
  };

  const handleSearch = () => {
    let searchValue = searchInputRef.current.value.toLowerCase();
    let menuItems = document.querySelectorAll('.custom-dropdown-menu-item');

    for (let i = 0; i < menuItems.length; i++) {
      let textValue = menuItems[i].textContent || menuItems[i].innerText;
      if (textValue.toLowerCase().indexOf(searchValue) > -1) {
        menuItems[i].style.display = "";
      } else {
        menuItems[i].style.display = "none";
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div className="custom-dropdown">
      <button className="custom-dropdown-button" onClick={toggleDropdown}>
        {title}
      </button>
      {isOpen && (
        <div className="custom-dropdown-menu">
          <input
            ref={searchInputRef}
            type="text"
            id="searchInput"
            className="search-input"
            placeholder="Search..."
            onInput={handleSearch}
          />
          <button className="custom-dropdown-clear" onClick={handleClearClick}>
            Clear
          </button>
          {options.map((option, index) => (
            <div
              key={index}
              className="custom-dropdown-menu-item"
              onClick={() => handleOptionClick(option)}
            >
              <input
                type="checkbox"
                checked={selectedOptions.includes(option)}
                readOnly
              />
              <label>{option}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

CustomDropdown.defaultProps = {
  onClear: () => {},
};

export default CustomDropdown;
