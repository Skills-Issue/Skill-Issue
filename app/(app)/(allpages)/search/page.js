"use client"
import { RoleProvider,useRoleContext } from "@/components/authentication/RoleContext";
import DefaultCard from "@/components/ui/Card";

export default function search(){
    const { selectedRole, setSelectedRole } = useRoleContext();
    console.log(selectedRole)
    return(
        <div><DefaultCard/></div>
        
    )
}