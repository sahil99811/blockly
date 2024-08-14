
import React, { useState, useEffect } from 'react';
import style from '../styles/LocationSearch.module.css';
import searchbar from '../assets/searchbar.png';
import location from '../assets/location.png';

const LocationSearch = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (query.length > 2) {
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`)
        .then(response => response.json())
        .then(data => {
          const newSuggestions = data.map((item) => ({
            lat: item.lat,
            lon: item.lon,
            display_name: item.display_name
          }));
          setSuggestions(newSuggestions.slice(0, 5));
        })
        .catch(error => console.error('Error fetching suggestions:', error));
    } else {
      setSuggestions([]);
    }
  }, [query]);
  
  return (
    <div className={style.container}>
      <div className={style.inputContainer}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter destination"
          className={style.input}
        />
        <img src={searchbar} alt='search bar' />
      </div>
      {
        suggestions.length>0&&<div className={style.suggestionContainer}>
        { suggestions.map((suggestion, index) => (
          <div key={index} className={style.suggestionItem} >
            <img src={location} alt='location icon' />
            <p
              onClick={() => {
                setSuggestions([])
                onSelect(suggestion.lat, suggestion.lon);
                setQuery('');
              }}
            >
              {suggestion.display_name}
            </p>
          </div>
        ))}
      </div>
      }
    </div>
  );
};

export default LocationSearch;
