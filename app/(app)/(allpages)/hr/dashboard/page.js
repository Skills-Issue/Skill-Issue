import RoleListingTable from "@/components/ui/RoleListingTable";
// ignore this for now it's just a button to go to create role listing page
import Outline from '@/components/ui/Button'
import Link from "next/link";

export default function hrDashboard() {
  
  return (
    <div>
        <div>
        <Link href="/hr/create">
        <Outline caption={"Create New Role"}/>
        </Link>
        <RoleListingTable />
        </div>
    </div>
  );
}
