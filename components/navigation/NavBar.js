import UserMenuOuter from "./UserMenuOuter"

export default function Navbar(){
    return (
        <div className="sticky bg-white top-0">
            <div className="flex h-16 items-center justify-between space-x-3 px-8">
            <div><nav className="flex items-center space-x-8 text-sm font-medium">
          <a
            className="transition-colors hover:text-foreground/80 text-foreground/60"
            href="/search"
          >
            Home
          </a>
          <a
            className="text-foreground/60 transition-colors hover:text-foreground/80"
            href="/login"
          >
            login
          </a>
        </nav></div>
            <UserMenuOuter/>
            
            </div>
            
        </div>
    )
}