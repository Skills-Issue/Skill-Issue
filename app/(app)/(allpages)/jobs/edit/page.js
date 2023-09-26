export default function Edit(){
    function handleSubmit(){
        alert("submitted");
    }
    return(
        <div>
            <h1>Edit</h1>
            <form onSubmit={handleSubmit}>
                
            </form>
        </div>
    )
}