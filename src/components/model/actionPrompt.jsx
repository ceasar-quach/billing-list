import { useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function ActionPrompt (props) {
    const {
        action,
        noValue,
        objects,
        submitForm,
        setActionPrompt
    } = props
    const [userInput, setUserInput] = useState(
        noValue?[]:objects
    );
    return (
        <div className="shadow-overlay w-100 h-100 position-fixed d-flex justify-content-center align-items-center">
            <div className="w-50 rounded bg-white p-3">
                <p className="text-capitalize">{action} client</p>
                <Form className='row py-3' onSubmit={(e)=>submitForm(e, userInput)}>
                {Object.keys(objects).map((key, index)=>
                  key!=='_id'&&key!=="description"&&<div className="col-6 text-start" key={index}>
                    <label>{key}</label>
                    <input 
                      className='form-control'
                      required 
                      value={userInput[key]}
                      onChange={(e)=>setUserInput(
                        {...userInput, [key]: e.target.value}
                      )}
                    ></input>
                  </div>
                )}
                <div className="text-end">
                    <Button variant="secondary" className="me-2" type="submit">Submit</Button>    
                    <Button variant="outline-secondary" onClick={()=>setActionPrompt([null, false])}>Cancel</Button>
                </div> 
              </Form>
            </div>
        </div>


    )
}