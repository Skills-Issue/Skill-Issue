"use client"
import React, { createContext, useContext, useState,useEffect } from 'react';


const RoleContext = createContext();

export const useRoleContext = () => useContext(RoleContext);


export const RoleProvider = ({ children }) => {
  const [selectedRole, setSelectedRole] = useState(initialRole || null);
  
  try{
    const initialRole = localStorage.getItem('selectedRole');
    
    
  } catch (error) {
    console.error('Error accessing localstorage',error)
  }
  

  // Use useEffect to save the selected role to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('selectedRole', selectedRole);
  }, [selectedRole]);

  return (
    <RoleContext.Provider value={{ selectedRole, setSelectedRole }}>
      {children}
    </RoleContext.Provider>
  );
};
