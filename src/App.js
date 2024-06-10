import React, { useEffect, useState } from 'react';
import API from './API/api';
import {   
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import './App.css';

import Table from './components/table/table';
import ActionPrompt from './components/model/actionPrompt';
import DeletePrompt from './components/model/deletePrompt';

export default function App() {
  useEffect(() => {
    document.title = "Reservation list"
  })
  const [actionPrompt, setActionPrompt] = useState([null, false])
  const [clientList, setClientList] = useState([]);
  const [invoiceList, setInvoiceList] = useState([]);
  const [currentClient, setCurrentClient] = useState([]);
  const [currentInvoice, setCurrentInvoice] = useState([]);
  const [tableHeader, setTableHeader] = useState([]);
  
  const deleteEntry = (type, data) => {
    data?
      type==='client'?
        (()=>{setClientList(clientList.filter(client=>!data.some(item=>item===client)&&client)); setInvoiceList([])})()
        :
        (()=>{setInvoiceList(invoiceList.filter(invoice=>!data.some(item=>item===invoice)&&invoice)); setCurrentInvoice([])})()
    :
    setActionPrompt([null, false])  
  }
  const submitForm = async (type, data) => {
    switch(actionPrompt[0]) {
      case "ADD":
        await type==='client'?
          setClientList([...clientList, {_id:"6399351534a6d892bb984a9"+clientList.length ,...data}])
          :
          setInvoiceList([...invoiceList, {_id:"65ecf3cde410f9d9da05bf8"+invoiceList.length ,...data, client:currentClient[0]._id}])
      break;
      case "EDIT":
        await type==='client'?
        setClientList([...clientList.filter(item=>item._id!==data._id), data])
        :
        (()=>{setInvoiceList([...invoiceList.filter(item=>item._id!==data._id), data]); setCurrentInvoice([])})()
      break;
      default:
        await setActionPrompt([null, false])
    }
    setActionPrompt([null, false])
  }
    useEffect(()=>{
        API.clientsIndex()
        .then(res=>setClientList(res.data))
        .catch(err=>console.log(err))

        API.getTableHeader()
        .then(res=>setTableHeader(res.data))
        .catch(err=>console.log(err))
    },[])
    useEffect(()=>{
      setCurrentInvoice([])
      currentClient.length>0?API.invoicesIndex()
      .then(res=>setInvoiceList(res.data.filter(item=>
          currentClient.some(client=>client._id===item.client)&&item
      )))
      .catch(err=>console.log(err))
      :
      setInvoiceList([])
    },[currentClient])
  return (
    <Router>
      <div className="App vh-100">
          {{"EDIT":
            <ActionPrompt
                action={actionPrompt[0]}
                setActionPrompt={setActionPrompt}
                submitForm={submitForm}
                data={actionPrompt[2]}
            />,
            "ADD":
            <ActionPrompt
                action={actionPrompt[0]}
                setActionPrompt={setActionPrompt}
                submitForm={submitForm}
                data={actionPrompt[2]}
            />,
            "DELETE":
            <DeletePrompt
                deleteEntry={deleteEntry}
                setActionPrompt={setActionPrompt}
                data={actionPrompt[2]}
            />
          }[actionPrompt[0]]}
          <Routes>
              <Route path="/" exact element={
                <div className='row my-5 py-5 mx-0 h-100'>
                  {
                    tableHeader.map((table, index)=>
                      <Table
                        key={index}
                        type={table.tableType}
                        data={table.tableType==="client"?clientList:invoiceList}
                        isFilterable={table.tableType==="client"}
                        filterKey="email"
                        hideColumn={table.tableType==="client"||currentClient.length>0}
                        multiSelect={table.tableType!=="client"}
                        tableHeader={table.header}
                        currentEntry={table.tableType==="client"?currentClient:currentInvoice}
                        setCurrentEntry={table.tableType==="client"?setCurrentClient:setCurrentInvoice}
                        tableActions ={['ADD', 'EDIT', 'DELETE']}
                        setActionPrompt={setActionPrompt}
                      />
                    )
                  }
                </div>
              }/>
          </Routes>
      </div>
    </Router>
  );
}
