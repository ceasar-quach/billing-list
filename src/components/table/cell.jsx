import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquare, faSquareCheck, faSquareMinus } from "@fortawesome/free-regular-svg-icons"
import { Table } from "react-bootstrap"
import { isMobile } from "react-device-detect"


export default function Index (props) {
    const {
        data,
        filterInput,
        multiSelect,
        tableHeader,
        filterKey,

        toTitleCase,
        setCurrentEntry,
        currentEntry
    } = props
    return (
        <div className={(isMobile&&"overflow-scroll")+" w-100"}>
        <Table
            striped bordered hover
        >
            <thead>
                <tr className="pointer">
                <th onClick={()=>
                currentEntry.length>0?
                    setCurrentEntry([])
                    :
                    setCurrentEntry(data)
                }>{multiSelect&&<FontAwesomeIcon icon={
                    (currentEntry.length===data.length&&currentEntry.length!==0&&faSquareCheck)||
                    (currentEntry.length>0&&currentEntry.length<data.length&&faSquareMinus)||
                    (currentEntry.length<=0&&faSquare)
                }
                />}</th>
                {tableHeader.map((item, index)=>
                <th key={index}>{toTitleCase(item)}
                </th>
                )}
                </tr>
            </thead>
            <tbody>
            {data.filter(entry=>filterInput.length>0?
                entry[filterKey].toLowerCase().indexOf(filterInput)>=0
                :
                entry
            ).map((user, index)=>
            <tr key={index}
                className="pointer"
                onClick={()=>
                    currentEntry.some(item=>item===user)?
                    setCurrentEntry(currentEntry.filter(item=>item!==user))
                    :
                    setCurrentEntry(currentEntry=>multiSelect?[...currentEntry, user]:[user])
                }
            >
                {<td>
                    <FontAwesomeIcon icon={
                        currentEntry.some(item=>item===user)?faSquareCheck:faSquare
                    }/>
                </td>}
                {tableHeader.map((item, index)=>
                    <td key={index}>{user[item]}</td>
                )}
            </tr>
            )}
            </tbody>
        </Table>
        </div>
    )
}