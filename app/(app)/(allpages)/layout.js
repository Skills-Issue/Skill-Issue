import Navbar from "@/components/navigation/NavBar";
import { RoleProvider } from '@/components/authentication/RoleContext'
export default function DashboardLayout({ children }) {
  
  return (
    
      <section>
        
        <RoleProvider>
        <Navbar/>
        {children}
        </RoleProvider>
        
      </section>
    
  );
}
