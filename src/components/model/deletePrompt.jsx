import { Button } from "react-bootstrap";

export default function DeletePrompt (props) {
    const {
        deleteEntry,
        data,
    } = props
    return(
    <div className="shadow-overlay w-100 h-100 fixed-top d-flex justify-content-center align-items-center">
        <div className="w-50 rounded bg-white p-3">
            <p>Delete {data.data.length>1?"these":"this"} {data.type.toLowerCase()+(data.data.length>1?"s":"")}?</p>
            <div className="text-end secondary-font">
                <Button variant="secondary" className="me-2" onClick={()=>{deleteEntry(data.type, data.data)}}>Confirm</Button>    
                <Button variant="outline-secondary" onClick={()=>deleteEntry(false)}>Cancel</Button>
            </div> 
        </div>
    </div>

    )
}