"use client"
import React, { createContext, useContext, useState,useEffect } from 'react';


const RoleContext = createContext();

export const useRoleContext = () => useContext(RoleContext);


export const RoleProvider = ({ children }) => {
  let initialRole = "";
  const [selectedRole, setSelectedRole] = useState("");
  useEffect(()=>{
    const initialRole = localStorage.getItem('selectedRole');    
  },[])
  useEffect(()=>{
    setSelectedRole(localStorage.getItem('selectedRole'));
  },[initialRole])


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
