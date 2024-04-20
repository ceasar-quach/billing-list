import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from "react-bootstrap"
import { faSort, faSquare, faCheckSquare } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react";

export default function KTable (props) {
    const {
        data,
        multiSelect,
        isSortable,

        actions,
        fitlerInput,
        setActionPrompt
    } = props
    const [isAllSelected, setIsAllSelected] = useState(false)
    const [selected, setSelected] = useState([]);
    return (
        data.length>0&&
            <table className="table stripe">
                            <thead>
                <tr className="table-dark">
                {multiSelect&&
                <th scope="col">
                    <span 
                        onClick={()=>{setIsAllSelected(!isAllSelected)}}
                    >
                        <FontAwesomeIcon icon={(selected.length===data.length-1||isAllSelected)?faCheckSquare:faSquare} />
                    </span>
                </th>}
                {Object.keys(data[0]).map((key, index)=>
                    (index!==(Object.keys(data[0]).length-1))&&
                    <th key={index} scope="col">
                        <span>
                        {key}
                        {isSortable&&
                            <FontAwesomeIcon className="ms-2 text-secondary" icon={faSort} />
                        }
                        </span>
                    </th>
                )}
                {actions&&<th><span>Actions</span></th>}
                </tr>
            </thead>
            {data.filter(entry=>entry.toString().toLowerCase().indexOf(fitlerInput)>=0).map((entry, index)=>
            <tbody key={index}>
                <tr>
                {multiSelect&&
                <th scope="row">
                    <span
                        onClick={()=>
                            index!==0&&selected.filter(item=>item===entry).length===0?
                            setSelected([...selected, entry])
                            :
                            setSelected(selected.filter(item=>item!==entry))
                        }
                    >
                        <FontAwesomeIcon className="text-secondary" icon={((selected.filter(item=>item===entry).length>0||index!==0)&&isAllSelected)?faCheckSquare:faSquare} />
                    </span>
                </th>}
                {Object.keys(data[0]).map((key, index)=>
                (key!=="description")&&<td key={index}>
                    <span>{entry[key]}</span>
                </td>
                )}
                <td>{actions.map((action, index)=>
                    <span key={index}>
                        <Button 
                            variant={action==="DELETE"?"outline-danger":"outline-dark"} 
                            className="ms-1"
                            onClick={()=>setActionPrompt([action, true, entry])}
                        >
                            {action}
                        </Button>
                    </span>
                )}</td>
                </tr>
            </tbody>)}
        </table>
    )
}