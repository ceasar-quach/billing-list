import { useState } from 'react';
import { FloatingLabel, Form, Image, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router";
import Api from '../API/api';


export default function Login () {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    
    const loginWithEnter = (e) =>{
        if (e.code === 'Enter') {
            login();
          }
    }
    const login = () => {
        Api.Login(email, password)
        .then(async response=>{
                await dispatch({ type: 'SET_TOKEN', payload: response.data })
                await Api.GetAdminInfo(response.data)
                    .then(async response=>{
                        await dispatch({ type: 'SET_ADMIN_INFO', payload: response.data })
                        await navigate('/home', {replace: true})
                    })
            }
        )
        .catch(error=>console.log(error))
    }


    return(
        <div className='h-100 d-flex align-items-center justify-content-center secondary-font'>
            <div style={{width: '300px'}}>
                <div className='w-100 mb-3'>
                    <div>
                        <p 
                            className='m-0 prime-font text-white'
                            style={{fontSize:'24pt'}}
                        >
                            Kaiser Ryu
                        </p>
                    </div>
                    {/* <Image className='w-75 mx-auto' src='./assets/logo.jpg'/> */}
                </div>
                <FloatingLabel
                    label="Email address"
                    className="text-white border-0 border-bottom mb-3"
                >
                    <Form.Control 
                        type="email"
                        className='bg-secondary border-0 text-white'
                        placeholder="name@example.com"
                        defaultValue={email}
                        onChange={e=>setEmail(e.target.value)}
                        onKeyPress={(e)=>loginWithEnter(e)}
                    />
                </FloatingLabel>
                <FloatingLabel
                    className="text-white border-0 border-bottom"
                    label="Password">
                    <Form.Control 
                        type="password"
                        placeholder="Password"
                        className='bg-secondary border-0 text-white'
                        defaultValue={password}
                        onChange={e=>setPassword(e.target.value)}
                        onKeyPress={(e)=>loginWithEnter(e)}
                    />
                </FloatingLabel>
                <div className='mt-5'>
                    <Button 
                        variant='outline-light'
                        onClick={login}
                    >
                        Login
                    </Button>
                </div>
            </div>
        </div>
    )
}