import React, {useRef, useState} from "react";
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
            size={25}
            className={"hover:bg-red-500 hover:text-white rounded p-2 cursor-pointer"}
            onClick={(e) => {
                handleSelect(e, null)
            }}
        />
    }

    return <div className={"w-full"} >
        <div style={{pointerEvents: "auto"}} ref={targetRef}></div>
        <Popover.Root open={open} onOpenChange={setOpen} >
            <Popover.Trigger style={{display: 'none'}}/>
            <Popover.Anchor asChild>
                <div className={"rounded flex border-solid border-[1px] border-lightgray p-2 items-center hover:bg-gray-200 cursor-pointer"} onClick={() => setOpen(x=>!x)} >
                    <div className={"flex-1"}>
                        {value?.label || <div className={"text-gray-700"}>{placeholder}</div>}
                    </div>
                    {icon}
                </div>
            </Popover.Anchor>
            <Popover.Portal container={targetRef.current}>
                <Popover.Content className={"mt-2 bg-background border-solid rounded border-[1px]" +
                    " border-gray-600 p-2 box-border w-[var(--radix-popper-anchor-width)]"}>
                    <div>
                        {items.map(x => <div
                            className={"p-2 cursor-pointer rounded hover:bg-accent"}
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
