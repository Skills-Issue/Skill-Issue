'use client';

import { Dropdown, Navbar } from 'flowbite-react';
import DefaultAvatar from './Avatar';
import Item from './Item';
import Link from 'next/link';
import { CustomFlowbiteTheme } from 'flowbite-react';

const customTheme = {
  button: {
    color: {
      primary: 'bg-red-500 hover:bg-red-600',
    },
  },
};

export default function NavbarWithDropdown() {
  function SignOut(){
    localStorage.clear();
  }

  return (
    <Navbar
      fluid
      rounded
      className='min-h-16'
    >
  
      <Navbar.Brand href="/">
        <img
          className="mr-3 h-6 sm:h-9"
          src="/SBRP.png"
        />
    
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={<DefaultAvatar alt="User settings" rounded/>}
          
        >
          <Dropdown.Header>
            <span className="block text-sm">
              Bonnie Green
            </span>
            <span className="block truncate text-sm font-medium">
              name@flowbite.com
            </span>
          </Dropdown.Header>
          <Item direct="Profile">
            
          </Item>
          <Dropdown.Divider />
          <Link href="/login" onClick={SignOut}>
            <Item className="text-red-500" direct="Sign Out" >
            Sign out
          </Item>
          </Link>
          
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link 
        href="/hr/dashboard">
          Home
        </Navbar.Link>
        <Navbar.Link href="#">
          Services
        </Navbar.Link>
        <Navbar.Link href="#">
          Pricing
        </Navbar.Link>
        <Navbar.Link href="login" onClick={SignOut} className='md:hidden text-red-500'>
          Sign Out
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}


