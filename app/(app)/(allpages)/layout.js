import Navbar from "@/components/navigation/NavBar";

export default function DashboardLayout({ children }) {
  
  return (
    
      <section>
        <Navbar/>
        {children}
      </section>
    
  );
}
