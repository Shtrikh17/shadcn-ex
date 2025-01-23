import React, {useRef, useState} from "react";
import {ChevronDown, XIcon} from "lucide-react";
import {SelectItem} from "./types";
import * as Popover from "@radix-ui/react-popover"
import {cn} from "@/lib/utils";

export interface SearchSelectProps {
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

    /** Search value */
    searchValue: string

    /** Hook on search value change */
    onSearchValueChange: (s: string) => void
}


export const SearchSelect = ({items, value, onSelect, nullable=true, ...props}: SearchSelectProps) => {
    const targetRef = useRef(null)
    const inputRef = useRef(null)
    const [searchActive, setSearchActive] = useState(false)

    const handleSelect = (e: React.MouseEvent<Element, MouseEvent>, value: SelectItem|null) => {
        e.stopPropagation() // Keep the popover open as it is controlled
        onSelect(value);
        props.onSearchValueChange(value?.label || '')
        setSearchActive(false);
    }

    const onStartSearch = () => {
        if(searchActive) return
        if(value) props.onSearchValueChange(value.label)
        setSearchActive(true)
    }

    const onCloseSearch = () => {
        props.onSearchValueChange('')
        setSearchActive(false)
    }

    const onOpenChange = (e: boolean) => {
        if(document.activeElement === inputRef.current) return
        setSearchActive(e)
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

    return <div>
        <div style={{pointerEvents: "auto"}} ref={targetRef}></div>
        <Popover.Root open={searchActive && !!items.length} onOpenChange={onOpenChange} >
            <Popover.Trigger style={{display: 'none'}}/>
            <Popover.Anchor asChild>
                <div
                    className={"rounded flex border-solid border-[1px] border-lightgray p-1 px-2 " +
                        "items-center hover:bg-accent cursor-pointer h-[30px] bg-background group"}
                    onClick={() => setSearchActive(true)}
                >
                    <div className={"flex-1"}>
                        <input
                            className={"bg-background group-hover:bg-accent group-hover:text-accent-foreground outline-none"}
                            onChange={e => props.onSearchValueChange(e.target.value)}
                            value={!searchActive && value?.label ? value?.label : props.searchValue}
                            placeholder={value ? props.placeholder : value?.label.toString()}
                            onFocus={() => onStartSearch()}
                            ref={inputRef}
                        />
                    </div>
                    {icon}
                </div>
            </Popover.Anchor>
            <Popover.Portal container={targetRef.current}>
                <Popover.Content
                    className={cn(
                        "z-50 w-[var(--radix-popper-anchor-width)] rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
                    )}
                    onOpenAutoFocus={e => {
                        e.preventDefault()
                    }}
                >
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
