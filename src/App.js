import React, { useEffect, useState } from 'react';
import Api from './API/api';
import {   
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import './App.css';

import Home from './screens/home';
import ActionPrompt from './components/model/actionPrompt';
import DeletePrompt from './components/model/deletePrompt';

export default function App() {
  useEffect(() => {
    document.title = "Reservation list"
  })
  const [actionPrompt, setActionPrompt] = useState([null, false])
  const [clientList, setClientList] = useState([]);
  useEffect(()=>{
      Api.GetClientList('token')
      .then(response=>{
          setClientList(response.data)
      })
      .catch(error=>console.log(error))
  },[])

  const deleteEntry = (data) => {
    setClientList(clientList.filter(item=>item!==data))
  }
  const submitForm = async (e, data) => {
    await e.preventDefault()
    switch(actionPrompt[0]) {
      case "ADD":
        await setClientList([...clientList, {_id:(Math.random() * 0xfffff * 1000000).toString(16) ,...data, description:""}])
      break;
      case "EDIT":
        await setClientList([...clientList.filter(item=>item._id!==data._id), data])
      break;
      default:
        await setActionPrompt([null, false])
    }
    setActionPrompt([null, false])
  }

  return (
    <Router>
      <div className="App vh-100">
          {{"EDIT":
            <ActionPrompt
                action={actionPrompt[0]}
                setActionPrompt={setActionPrompt}
                submitForm={submitForm}
                objects={actionPrompt[2]}
            />,
            "ADD":
            <ActionPrompt
                action={actionPrompt[0]}
                setActionPrompt={setActionPrompt}
                submitForm={submitForm}
                objects={clientList[0]}
                noValue
            />,
            "DELETE":
            <DeletePrompt
                deleteEntry={deleteEntry}
                data={actionPrompt[2]}
                setActionPrompt={setActionPrompt}
            />
          }[actionPrompt[0]]}
          <Routes>
              <Route path="/" exact element={
                <Home
                  clientList={clientList}
                  setActionPrompt={setActionPrompt}
                />
              }/>
          </Routes>
      </div>
    </Router>
  );
}
