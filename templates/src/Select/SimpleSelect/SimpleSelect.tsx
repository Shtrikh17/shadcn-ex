import React, {useRef, useState} from "react";
import "./SimpleSelect.scss"
import {SimpleSelectProps} from "./SimpleSelect.types";
import {ChevronDown, XIcon} from "lucide-react";
import {SelectItem} from "../types";
import * as Popover from "@radix-ui/react-popover"

export const SimpleSelect = ({items, value, onSelect, placeholder, nullable=true}: SimpleSelectProps) => {
    const [open, setOpen] = useState(false)
    const targetRef = useRef(null)

    const handleSelect = (e: React.MouseEvent<Element, MouseEvent>, value: SelectItem) => {
        e.stopPropagation() // Keep the popover open as it is controlled
        onSelect(value);
        setOpen(false);
    }

    let icon
    if(!value || !nullable){
        icon = <ChevronDown size={20} />
    }
    else{
        icon = <XIcon
            size={20}
            className={"scotch-select-simple-icon-reset"}
            onClick={(e) => {
                handleSelect(e, null)
            }}
        />
    }

    return <div className={"scotch-select-simple"} >
        <div style={{pointerEvents: "auto"}} ref={targetRef}></div>
        <Popover.Root open={open} onOpenChange={setOpen} >
            <Popover.Trigger style={{display: 'none'}}/>
            <Popover.Anchor asChild>
                <div className={"scotch-select-simple-input"} onClick={() => setOpen(x=>!x)} >
                    <div className={"scotch-select-simple-input-value"}>
                        {value?.label || <div className={"scotch-select-simple-input-placeholder"}>{placeholder}</div>}
                    </div>
                    {icon}
                </div>
            </Popover.Anchor>
            <Popover.Portal container={targetRef.current}>
                <Popover.Content className={"scotch-select-simple-popover"}>
                    <div>
                        {items.map(x => <div
                            className={"scotch-select-simple-popover-item"}
                            onMouseDown={(e) => handleSelect(e, x)}
                            key={"d-content-"+x.value}
                        >
                            {x.view || x.label}
                        </div>)}
                    </div>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    </div>
}
