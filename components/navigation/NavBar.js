"use client";

import { Dropdown, Navbar } from "flowbite-react";
import InlineDropdown from "../ui/Dropdown";
import DefaultAvatar from "./Avatar";
import Item from "./Item";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useRoleContext } from "../authentication/RoleContext";
import { DEFAULT_REDIRECTS } from "@/lib/hooks/constants";

export default function NavbarWithDropdown() {
  // const device = useMediaQuery();
  // console.log(device);

  const router = useRouter();
  const [AccType, setAccType] = useState("");
  const { selectedRole, setSelectedRole } = useRoleContext();

  function SignOut() {
    localStorage.clear();
  }
  function CheckType() {
    try {
      const account = localStorage.getItem("Account");
      if (account === "4"|| "1") {
        setAccType("hr");
      } else {
        setAccType("staff");
      }
    } catch (error) {
      console.error(error);
    }
  }

  function GetCredentials() {
    const [full_name, setFullName] = useState("");
    const [Email, setEmail] = useState("");

    useEffect(() => {
      const user = localStorage.getItem("user");
      if (user) {
        const Userdata = JSON.parse(user);
        const FullName = `${Userdata.staff_fname} ${Userdata.staff_lname}`;
        const userEmail = Userdata.email;
        if (FullName) {
          setFullName(FullName);
        }
        if (userEmail) {
          setEmail(userEmail);
        }
      }
    }, []);

    return { full_name, Email };
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
    
    <Navbar fluid rounded >
      <Navbar.Brand >
        <img className="mr-3 h-6 sm:h-9" src="/SBRP.png" />
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={<DefaultAvatar alt="User settings" rounded />}
        >
          <Dropdown.Header>
            <span className="block text-sm">{GetCredentials().full_name}</span>
            <span className="block truncate text-sm font-medium">
              {GetCredentials().Email}
            </span>
          </Dropdown.Header>
          <Link href="/profile">
            <Item direct="Profile"></Item>
          </Link>
          <Dropdown.Divider />
          <Link href="/login" onClick={SignOut}>
            <Item className="text-red-500" direct="Sign Out">
              Sign out
            </Item>
          </Link>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        {selectedRole == "Human Resources" && (
          <Navbar.Link href={DEFAULT_REDIRECTS.hrdashboard}>Home</Navbar.Link>
        )}
        {selectedRole == "Staff" && (
          <Navbar.Link href={DEFAULT_REDIRECTS.staffdashboard}>Home</Navbar.Link>
        )}
        <Navbar.Link href={DEFAULT_REDIRECTS.profile} className="md:hidden">
          Profile
        </Navbar.Link>
        {AccType === "hr" && (
          <Navbar.Link>
            <InlineDropdown CurrentState={AccType} />
          </Navbar.Link>
        )}
        <Navbar.Link
          href="login"
          onClick={SignOut}
          className="md:hidden text-red-500"
        >
          Sign Out
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
    
  );
}
