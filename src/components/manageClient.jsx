import { Button } from "react-bootstrap"



export default function ClientForm (props) {
    const closeForm = () => {
        props.setClientFormOpen(false);
        props.setNewClient()
    }

    return (
        <div className="shadow-overlay w-100 h-100 position-fixed d-flex justify-content-center align-items-center">
            <div className="w-50 h-50 bg-white">

                <Button onClick={()=>closeForm()}>Close</Button>    
            </div>
        </div>
    )
}