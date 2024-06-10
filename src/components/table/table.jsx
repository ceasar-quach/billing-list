import Cell from "./cell";
import { useState } from "react";
import { FloatingLabel, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import toTitleCase from "../../script/toTitleCase"
import { isMobile } from "react-device-detect";

export default function Index (props) {
    const {
        setActionPrompt,
        type,
        data,
        currentEntry,
        filterKey,
        tableHeader,
        setCurrentEntry,
        hideColumn,
        multiSelect,
        tableActions,
        isFilterable
    } = props;
    const [filterInput, getFilterInput] = useState([]);
    return(
        hideColumn&&<div className={(isMobile?"h-50":"h-100")+" secondary-font col-md-6"}>
        <div className="row justify-content-between align-items-center px-2 mb-2">
            <div className="col-auto p-0 order-2">
                {tableActions.map((action, index)=>
                <Button
                    key={index}
                    className="me-2 my-2"
                    variant={action==="DELETE"?"outline-danger":"outline-dark"}
                    disabled={
                        (action!=="ADD")&&
                        (currentEntry.length!==1||action!=="EDIT")&&
                        (currentEntry.length<=0||action!=="DELETE")
                    }
                    onClick={()=>{
                        setActionPrompt([action, true, {
                            type:type,
                            fields:tableHeader,
                            data:action==="ADD"?[]:currentEntry
                        }])
                    }}
                >
                    {toTitleCase(action)} {type}{currentEntry.length>1&&action==="DELETE"?"s":""}
                </Button>
                )}
            </div>
            <div className="col">
            <FloatingLabel 
                className="border-0 border-bottom border-black d-flex align-items-center"
                label={"Filter "+type+"'s email"}
                style={{visibility:!isFilterable&&"hidden"}}
            >
                <Form.Control
                    placeholder="text"
                    className="border-0 pb-0"
                    onChange={(e)=>getFilterInput(e.target.value)}
                />
                <FontAwesomeIcon
                    className="mx-3"
                    icon={faSearch}
                />
            </FloatingLabel>
            </div>
        </div>
        {tableHeader.length>0&&<Cell
            data={data}
            filterInput={filterInput}
            multiSelect={multiSelect}
            filterKey={filterKey}
            currentEntry={currentEntry}
            setCurrentEntry={setCurrentEntry}
            toTitleCase={toTitleCase}
            tableHeader={tableHeader}
        />}
    </div>
    )
}