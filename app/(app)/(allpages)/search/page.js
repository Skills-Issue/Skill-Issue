"use client"
import { RoleProvider,useRoleContext } from "@/components/authentication/RoleContext";

export default function search(){
    const { selectedRole, setSelectedRole } = useRoleContext();
    console.log(selectedRole)
    return(
        <div>Hi</div>
        
    )
}