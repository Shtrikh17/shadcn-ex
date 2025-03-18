import React, {useRef, useState} from "react";
import {CheckIcon, ChevronDown, TrashIcon} from "lucide-react";
import {SelectItem} from "./types";
import * as Popover from "@radix-ui/react-popover"
import {ChipList} from "../Chips/ChipList";
import {Chip} from "../Chips/Chip";
import {IconsProps} from "./types";
import {cn} from "@/lib/utils";

export interface SearchMultiSelectProps {
    /** Array of items */
    items: SelectItem[],

    /** Function to select items */
    onSelect: (value: SelectItem[]) => void,

    /** Current selection */
    value: SelectItem[],

    /** MaxChips */
    maxChips?: number

    /** Caption */
    caption?: string

    /** Icons */
    icons?: IconsProps

    /** Search value */
    searchValue: string

    /** Hook on search value change */
    onSearchValueChange: (s: string) => void

    /** Collapse on select */
    collapseOnSelect?: boolean
}



export const SearchMultiSelect = ({collapseOnSelect=false, ...props}: SearchMultiSelectProps) => {
    const targetRef = useRef(null)
    const inputRef = useRef(null)

    const [searchActive, setSearchActive] = useState(false)

    const onStartSearch = () => {
        setSearchActive(true)
    }

    const toggleSelect = (value: SelectItem) => {
        if(props.value.some(x=>x.value === value.value)){
            props.onSelect(props.value.filter(x => x.value !== value.value))
        }
        else{
            props.onSelect([...props.value, value]);
        }
        if(collapseOnSelect){
            setSearchActive(false);
        }
    }

    const onOpenChange = (e: boolean) => {
        if(document.activeElement === inputRef.current) return
        setSearchActive(e)
    }

    return <div className={"space-y-2"}>
        <div className={"scotch-select-multi"} ref={targetRef}>
        <Popover.Root open={searchActive && !!props.items.length} onOpenChange={onOpenChange} >
            <Popover.Trigger style={{display: 'none'}}/>
            <Popover.Anchor asChild>
                <div
                    className={"rounded flex border-solid border-[1px] border-lightgray p-1 px-2 " +
                        "items-center hover:bg-accent cursor-pointer bg-background group"}
                    onClick={() => setSearchActive(true)}
                >
                    <div className={"flex-1"}>
                        <input
                            className={"bg-background group-hover:bg-accent group-hover:text-accent-foreground outline-none"}
                            onChange={e => props.onSearchValueChange(e.target.value)}
                            value={!searchActive ? '' : props.searchValue}
                            placeholder={props.caption}
                            onFocus={() => onStartSearch()}
                            ref={inputRef}
                        />
                    </div>
                    <ChevronDown size={20}/>
                </div>
            </Popover.Anchor>
            <Popover.Portal>
                <Popover.Content
                    className={cn(
                        "z-50 w-[var(--radix-popper-anchor-width)] rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in " +
                        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 " +
                        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2" +
                        "  max-h-[200px] overflow-y-auto",
                    )}
                    onOpenAutoFocus={e => {
                        e.preventDefault()
                    }}
                >
                    <div className={"space-y-1"}>
                        {props.items.map(x => <div
                            className={"px-2 py-1 cursor-pointer rounded hover:bg-accent flex justify-between items-center data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"}
                            onMouseDown={(e) => toggleSelect(x)}
                            key={"d-content-" + x.value}
                            data-selected={props.value.some(y => x.value === y.value)}
                        >
                            <div>{x.view || x.label}</div>
                            {
                                props.value.some(y => x.value === y.value)
                                    ? <CheckIcon size={15}/>
                                    : null
                            }
                        </div>)}
                    </div>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
        </div>

        <ChipList maxChips={props.maxChips}>
            {
                props
                    .value
                    .map((x, i) => <Chip
                        key={i}
                        actions={[
                            <TrashIcon
                                key={1}
                                className={"hover:bg-destructive hover:text-destructive-foreground rounded p-1 cursor-pointer"}
                                size={props.icons?.sizes?.remove || 20}
                                onClick={() => toggleSelect(x)}
                            />
                        ]}
                    >
                        {x.view || x.label}
                    </Chip>)
            }
        </ChipList>
    </div>
}
