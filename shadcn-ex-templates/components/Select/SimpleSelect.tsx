import React, {useRef, useState} from "react";
import {ChevronDown, XIcon} from "lucide-react";
import {SelectItem} from "./types";
import * as Popover from "@radix-ui/react-popover"

interface SimpleSelectProps {
    /** Array of items */
    items: SelectItem[],

    /** Function to select item */
    onSelect: (value: SelectItem | null) => void,

    /** Current selection */
    value: SelectItem | null,

    /** Input placeholder */
    placeholder?: string,

    /** Nullability */
    nullable?: boolean
}


export const SimpleSelect = ({items, value, onSelect, placeholder, nullable=true}: SimpleSelectProps) => {
    const [open, setOpen] = useState(false)
    const targetRef = useRef(null)

    const handleSelect = (e: React.MouseEvent<Element, MouseEvent>, value: SelectItem|null) => {
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
            className={"hover:bg-destructive hover:text-destructive-foreground rounded p-1 cursor-pointer"}
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
                <div
                    className={"rounded flex border-solid border p-1 px-2 " +
                    "items-center hover:bg-accent cursor-pointer bg-transparent h-9"}
                     onClick={() => setOpen(x=>!x)}
                >
                    <div className={"flex-1"}>
                        {value?.label || <div className={"text-gray-700"}>{placeholder}</div>}
                    </div>
                    {icon}
                </div>
            </Popover.Anchor>
            <Popover.Portal container={targetRef.current}>
                <Popover.Content className={"mt-2 bg-background border-solid rounded border" +
                    " p-1 box-border w-[var(--radix-popper-anchor-width)] z-50"}>
                    <div>
                        {items.map(x => <div
                            className={"px-2 py-1 cursor-pointer rounded hover:bg-accent"}
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
