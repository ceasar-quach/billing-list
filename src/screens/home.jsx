import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Table, FloatingLabel, Form, Button } from "react-bootstrap";
import Api from "../API/api"
import ClientForm from "../components/manageClient";

export default function Home () {
    let token = useSelector(state=>state.token);
    const [clientList, setClientList] = useState([]);
    const rowHeader = ['ID', 'Full Name', 'Email' , 'Total Amount', 'Last update','Action',];
    const [clientFormOpen, setClientFormOpen] = useState(false)
    const [newClient, setNewClient] = useState()
    const getClientInput = () =>{

    }

    useEffect(()=>{
        Api.GetClientList(token)
        .then(response=>{
            setClientList(response.data)
        })
        .catch(error=>console.log(error))
    },[token])

    return(
        <div className="h-100 secondary-font">
            {clientFormOpen&&
                <ClientForm 
                    setClientFormOpen={setClientFormOpen}
                    setNewClient={setNewClient}
                    edit={newClient}
                />
            }
            <div className="h-25">

            </div>
            <div className="h-75 mx-auto" style={{width: '90%'}} >
                <div className="mb-3 d-flex">
                    <FloatingLabel 
                        className="text-white border-0 border-bottom w-25"
                        label="Client's name filter">
                        <Form.Control
                            placeholder="text"
                            className="bg-secondary border-0"
                            onChange={(e)=>getClientInput(e.target.value)}
                        />
                    </FloatingLabel>
                    <div className="d-flex align-items-center ms-4">
                        <Button 
                            variant="outline-light" 
                            onClick={()=>{
                                setClientFormOpen(true)
                                setNewClient(false)
                            }}
                        >
                            Add Client
                        </Button>
                    </div>
                </div>
                <Table 
s                    variant="dark"
                    striped bordered hover
                >
                    <thead>
                        <tr>
                            {rowHeader.map((item, index)=>
                                <th key={index} className="col">{item}</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {clientList.map((item, index)=>
                            <tr key={index}>
                                <td>
                                    {/* id */}
                                    {index}
                                </td>
                                <td>
                                    {/* Full Name */}
                                    {item.first_name} {item.last_name}
                                </td>
                                <td>
                                    {/* email */}
                                    {item.email}
                                </td>
                                <td>
                                    {/* Total amount */}
                                    {item.description.Others.Total} {item.description.Others.Curency}
                                </td>
                                <td>
                                    {/* last update */}
                                    {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(Date.now())}
                                </td>
                                <td>
                                    {/* action */}
                                    <Button
                                        variant="link"
                                        className="link-light"
                                        onClick={()=>{
                                            setClientFormOpen(true)
                                            setNewClient(true)
                                        }}
                                    >
                                        Edit
                                    </Button>
                                </td>
                            </tr>        
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}