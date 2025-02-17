import React, {useRef, useState} from "react";
import {XIcon} from "lucide-react";
import * as Popover from "@radix-ui/react-popover"
import {cn} from "@/lib/utils";

export interface AutoCompleteProps{
    items: Array<string>,
    width?: string,
    placeholder?: string
    searchValue: string,
    onSearch: (value: string) => void,
}

export const AutoComplete = ({items, placeholder, ...props}: AutoCompleteProps) => {
    const targetRef = useRef(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const [searchActive, setSearchActive] = useState(false)

    const handleSelect = (e: React.MouseEvent<Element, MouseEvent>, value: string) => {
        e.stopPropagation() // Keep the popover open as it is controlled
        props.onSearch(value);
        setSearchActive(false);
    }

    const onStartSearch = () => {
        setSearchActive(true)
    }

    const onOpenChange = (e: boolean) => {
        if(document.activeElement === inputRef.current) return
        setSearchActive(e)
    }

    let icon
    if(props.searchValue?.length){
        icon = <XIcon
            size={20}
            className={"hover:bg-destructive hover:text-destructive-foreground rounded p-1 cursor-pointer"}
            onClick={(e) => {
                props.onSearch('')
                e.stopPropagation()
                if(inputRef.current)
                    inputRef.current.focus()
            }}
        />
    }

    return <div className={"scotch-autocomplete"}>
        <div style={{pointerEvents: "auto"}} ref={targetRef}></div>
        <Popover.Root open={searchActive && !!items.length} onOpenChange={onOpenChange} >
            <Popover.Trigger style={{display: 'none'}}/>
            <Popover.Anchor asChild>
                <div
                    className={"rounded flex border-solid border-[1px] border-lightgray p-1 px-2 " +
                        "items-center hover:bg-accent cursor-pointer h-[30px] bg-background group w-75"}
                    onClick={() => setSearchActive(true)}
                >
                    <div className={"flex-1"}>
                        <input
                            ref={inputRef}
                            className={"bg-background group-hover:bg-accent group-hover:text-accent-foreground outline-none"}
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
                    className={cn(
                        "z-50 w-[var(--radix-popper-anchor-width)] rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
                    )}
                    onOpenAutoFocus={e => {
                        e.preventDefault()
                    }}
                >
                    <div>
                        {items.map((x,i) => <div
                            className={"px-2 py-1 cursor-pointer rounded hover:bg-accent"}
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
