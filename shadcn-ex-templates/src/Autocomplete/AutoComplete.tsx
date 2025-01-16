import React, {useRef, useState} from "react";
import "./AutoComplete.scss"
import {AutoCompleteProps} from "./AutoComplete.types";
import {XIcon} from "lucide-react";
import * as Popover from "@radix-ui/react-popover"

export const AutoComplete = ({items, placeholder, ...props}: AutoCompleteProps) => {
    const targetRef = useRef(null)
    const inputRef = useRef(null)
    const [searchActive, setSearchActive] = useState(false)

    const handleSelect = (e: React.MouseEvent<Element, MouseEvent>, value: string) => {
        e.stopPropagation() // Keep the popover open as it is controlled
        props.onSearch(value);
        setSearchActive(false);
    }

    const onStartSearch = () => {
        setSearchActive(true)
    }


    let icon
    if(props.searchValue?.length){
        icon = <XIcon
            size={20}
            className={"scotch-autocomplete-icon-reset"}
            onClick={(e) => {
                props.onSearch('')
                e.stopPropagation()
                inputRef.current.focus()
            }}
        />
    }

    return <div className={"scotch-autocomplete"}>
        <div style={{pointerEvents: "auto"}} ref={targetRef}></div>
        <Popover.Root open={searchActive && !!items.length} onOpenChange={() => setSearchActive(false)} >
            <Popover.Trigger style={{display: 'none'}}/>
            <Popover.Anchor asChild>
                <div className={"scotch-autocomplete-input"} onClick={() => setSearchActive(x=>!x)} >
                    <div className={"scotch-autocomplete-input-value"}>
                        <input
                            ref={inputRef}
                            className={"scotch-autocomplete-input-input"}
                            onChange={e => props.onSearch(e.target.value)}
                            value={props.searchValue}
                            placeholder={placeholder || ''}
                            onFocus={() => onStartSearch()}
                        />
                    </div>
                    {icon}
                </div>
            </Popover.Anchor>
            <Popover.Portal  container={targetRef.current}>
                <Popover.Content
                    className={"scotch-autocomplete-popover"}
                    onOpenAutoFocus={e => {
                        e.preventDefault()
                    }}
                >
                    <div>
                        {items.map((x,i) => <div
                            className={"scotch-autocomplete-popover-item"}
                            onMouseDown={(e) => handleSelect(e, x)}
                            key={"d-content-"+i}
                        >
                            {x}
                        </div>)}
                    </div>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    </div>
}
