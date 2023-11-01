import React, { useEffect, useState } from "react";

export default function InputSearch({
  placeholderText = "Search Skill to Add",
  data = [],
  updateParentState,
  dataToSend,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");

  const handleInputChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  };

  const selectedItem = (item) => {
      if(item!=""){
      setSelectedSkill(item)
      setSearchQuery("");
      
      }
      
  };

  useEffect(() => {
    if(selectedSkill!=""){
      updateParentState(selectedSkill);
      setSelectedSkill("")
    }
    
  }, [selectedSkill]);


  const filteredResults =
    Array.isArray(data) &&
    data.filter((result) => result.toLowerCase().includes(searchQuery));

  return (
    <div className="relative">
      <input
        type="text"
        id="search"
        className={`border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 ${
          isFocused ? "rounded-t-lg" : "rounded-lg"
        }`}
        placeholder={placeholderText}
        onChange={handleInputChange}
      />

      <div
        aria-label="result"
        className="bg-white border border-gray-300 rounded-lg absolute z-10 mt-1 w-full"
      >
        <div className="max-h-32 overflow-scroll">
          {filteredResults.length > 0 ? (
            filteredResults.map((result, index) => (
              <div
                key={index}
                className="p-2 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  selectedItem(result);
                }}
              >
                {result}
              </div>
            ))
          ) : (
            <div className="p-2">No result found</div>
          )}

          
            
          
        </div>
      </div>
    </div>
  );
}
