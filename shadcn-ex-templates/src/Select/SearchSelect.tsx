import React, {useRef, useState} from "react";
import {ChevronDown, XIcon} from "lucide-react";
import {SelectItem} from "./types";
import * as Popover from "@radix-ui/react-popover"

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
    const [searchActive, setSearchActive] = useState(false)

    const handleSelect = (e: React.MouseEvent<Element, MouseEvent>, value: SelectItem|null) => {
        e.stopPropagation() // Keep the popover open as it is controlled
        onSelect(value);
        props.onSearchValueChange(value.label || '')
        setSearchActive(false);
    }

    const onStartSearch = () => {
        if(value) props.onSearchValueChange(value.label)
        setSearchActive(true)
    }

    const onCloseSearch = () => {
        props.onSearchValueChange('')
        setSearchActive(false)
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

    return <div className={"scotch-select-search"}>
        <div style={{pointerEvents: "auto"}} ref={targetRef}></div>
        <Popover.Root open={searchActive && !!items.length} onOpenChange={setSearchActive} >
            <Popover.Trigger style={{display: 'none'}}/>
            <Popover.Anchor asChild>
                <div className={"scotch-select-search-input"} onClick={() => setSearchActive(true)} >
                    <div className={"scotch-select-search-input-value"}>
                        <input
                            className={"scotch-select-search-input-input"}
                            onChange={e => props.onSearchValueChange(e.target.value)}
                            value={!searchActive && value?.label ? value?.label : props.searchValue}
                            placeholder={value ? props.placeholder : value?.label.toString()}
                            onFocus={() => onStartSearch()}
                        />
                    </div>
                    {icon}
                </div>
            </Popover.Anchor>
            <Popover.Portal container={targetRef.current} >
                <Popover.Content
                    className={"scotch-select-search-popover"}
                    onOpenAutoFocus={e => {
                        e.preventDefault()
                    }}
                >
                    <div>
                        {items.map(x => <div
                            className={"scotch-select-search-popover-item"}
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
