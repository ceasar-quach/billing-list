import { useState } from "react";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import toTitleCase from "../../script/toTitleCase";

export default function ActionPrompt (props) {
    const {
        action,
        submitForm,
        data,
        setActionPrompt
    } = props;
    const [userInput, setUserInput] = useState(
      data.data.length>0?data.data[0]:[]
    );
    const [showError, setShowError] = useState(false)
    const validate = !data.fields.some(field=>(!userInput[field]||userInput[field].length<0))
    return (
        <div className="shadow-overlay w-100 h-100 fixed-top d-flex justify-content-center align-items-center">
            <div className="w-50 rounded bg-white p-3">
                <h5 className="secondary-font">{toTitleCase(action)} {data.type}</h5>
                <Form className='row px-5 py-3'
                  onSubmit={(e)=>{
                    e.preventDefault()
                    if(validate){
                      submitForm(data.type, userInput)
                    }else{
                      setShowError(true)
                    }}
                  }
                >
                {data.fields.map((field, index)=>
                <FloatingLabel 
                    key={index}
                    className="col-6 d-flex align-items-center secondary-font py-2"
                    label={toTitleCase(field)+'*'}
                >
                    <Form.Control
                        placeholder="text"
                        className="border-0 pb-0 px-2 border-bottom border-0 border-secondary rounded-0"
                        defaultValue={data.data.length>0?data.data[0][field]:[]}
                        onChange={(e)=>setUserInput(
                          {
                            ...userInput,
                            [field]:e.target.value
                          }
                        )}
                    />
                </FloatingLabel>)}
                {showError&&<p className="text-danger">(*) fields are required</p>}
                <div className="text-end secondary-font">
                  <Button variant="outline-secondary" className="me-2" type="submit">Submit</Button>    
                  <Button variant="text-secondary" onClick={()=>setActionPrompt([null, false])}>Cancel</Button>
                </div> 
              </Form>
            </div>
        </div>


    )
}