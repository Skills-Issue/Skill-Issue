import DefaultCard from "@/components/ui/Card";
import Link from 'next/link';

export default function access(){
    
    return(
        <div className="grid grid-cols-2 mt-48"> 
            <div className="mx-auto">
            <Link href={"/hr/dashboard"}>
                <DefaultCard title={"Human Resources"} description={"Enter the Human Resources interface"} source="/hr.jpg"/>
            </Link>
            </div>
            <div>
            <Link href={"/hr/create"}>
                <DefaultCard title={"Human Resources"} description={"Create new role listing"} source="/hr.jpg"/>
            </Link>
            </div>
            <div>
            <Link href={"/staff/dashboard"}>
                <DefaultCard title={"Staff"} description={"Access the Staff interface"} source="/staff.jpg"/>
            </Link>
            </div>
        </div>
         
    )
}