"use client"
import React, { createContext, useContext, useState } from 'react';

// Create the context
const RoleContext = createContext();

// Create a custom hook for accessing the context
export const useRoleContext = () => useContext(RoleContext);

// Create a provider component to wrap your app
export const RoleProvider = ({ children }) => {
  const [selectedRole, setSelectedRole] = useState(null);

  return (
    <RoleContext.Provider value={{ selectedRole, setSelectedRole }}>
      {children}
    </RoleContext.Provider>
  );
};
