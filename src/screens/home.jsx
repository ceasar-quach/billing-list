import { FloatingLabel, Form, Button } from "react-bootstrap";
import KTable from "../components/table";
import { useState } from "react";

export default function Home (props) {
    const {
        setActionPrompt,
        clientList,
    } = props
    const [fitlerInput, getFitlerInput] = useState([]);
    return(
        <div className="h-100 secondary-font">
            <div className="h-25">

            </div>
            <div className="h-75 mx-auto" style={{width: '90%'}} >
                <div className="mb-3 d-flex">
                    <FloatingLabel 
                        className="border-0 border-bottom border-black w-25"
                        label="Client's name filter">
                        <Form.Control
                            placeholder="text"
                            className="border-0"
                            onChange={(e)=>getFitlerInput(e.target.value)}
                        />
                    </FloatingLabel>
                    <div className="d-flex align-items-center ms-4">
                        <Button 
                            variant="outline-dark" 
                            onClick={()=>{
                                setActionPrompt(['ADD', true])
                            }}
                        >
                            Add Client
                        </Button>
                    </div>
                </div>
                <KTable
                    data={clientList}
                    fitlerInput={fitlerInput}
                    multiSelect
                    isSortable

                    actions={clientList.length>1?[
                        "EDIT",
                        "DELETE"
                    ]:[]}
                    setActionPrompt={setActionPrompt}
                />
            </div>
        </div>
    )
}