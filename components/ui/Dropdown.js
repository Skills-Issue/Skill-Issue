"use client"

import { Dropdown } from 'flowbite-react';
import Link from 'next/link';
import { useRoleContext } from '../authentication/RoleContext';

export default function InlineDropdown() {
  
  const { selectedRole, setSelectedRole } = useRoleContext();


  function toggleRole() {
    setSelectedRole((prevRole) =>
      prevRole === 'Human Resources' ? 'Staff' : 'Human Resources'
    );
  }

  return (
    <Dropdown inline label={selectedRole || 'Human Resources'} className='{}'>
      <Link href='/hr/dashboard' onClick={toggleRole}>
        <Dropdown.Item>Human Resources</Dropdown.Item>
      </Link>
      <Link href='/staff/dashboard' onClick={toggleRole}>
        <Dropdown.Item>Staff</Dropdown.Item>
      </Link>
    </Dropdown>
  );
}



