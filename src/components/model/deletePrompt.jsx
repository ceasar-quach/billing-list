import { Button } from "react-bootstrap";
export default function DeletePrompt (props) {
    const {
        deleteEntry,
        data,
        setActionPrompt,
    } = props

    return(
    <div className="shadow-overlay w-100 h-100 position-fixed d-flex justify-content-center align-items-center">
        <div className="w-50 rounded bg-white p-3">
            <p className="text-capitalize">Delete this client?</p>
            <div className="text-end">
                <Button variant="secondary" className="me-2" onClick={()=>{deleteEntry(data);setActionPrompt([null, false])}}>Confirm</Button>    
                <Button variant="outline-secondary" onClick={()=>setActionPrompt([null, false])}>Cancel</Button>
            </div> 
        </div>
    </div>

    )
}