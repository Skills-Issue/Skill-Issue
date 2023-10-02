export default function Item({className,direct,href}){
    return(
        <div className={`block px-4 py-2 hover:bg-gray-100 ${className}`} >
            {direct}
        </div>
    )
}