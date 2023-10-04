'use client';

import { Dropdown,Navbar } from 'flowbite-react';
import InlineDropdown from '../ui/Dropdown';
import DefaultAvatar from './Avatar';
import Item from './Item';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect,useState } from 'react';
import { useRoleContext } from '../authentication/RoleContext';

export default function NavbarWithDropdown() {
  const router=useRouter()
  const [AccType, setAccType] = useState("");
  const { selectedRole, setSelectedRole } = useRoleContext();

  function SignOut(){
    localStorage.clear();
  }
  function CheckType() {
    try {
      const account = localStorage.getItem("Account");
      if (account === "1") {
        setAccType("hr");
      } else {
        setAccType("staff");
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  

  useEffect(() => {
    CheckType();
  }, []);

  // useEffect(() => {
  //   if (AccType == "") {
  //     router.push("/login");
  //   }
  // }, [AccType]);

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
          <Item direct="Profile" href="/profile">
            
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
        {selectedRole=="Human Resources" && (
        <Navbar.Link 
        href={`/hr/dashboard`}>
          Home
        </Navbar.Link>
        )}
        {selectedRole=="Staff" && (
        <Navbar.Link 
        href={`/staff/dashboard`}>
          Home
        </Navbar.Link>
        )}
        {AccType === "hr" && (
        <Navbar.Link>
          <InlineDropdown CurrentState={AccType} />
        </Navbar.Link>
      )}
        
        
        <Navbar.Link href="login" onClick={SignOut} className='md:hidden text-red-500'>
          Sign Out
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}


