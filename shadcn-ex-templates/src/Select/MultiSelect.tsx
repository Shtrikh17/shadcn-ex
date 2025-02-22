import React, {useRef, useState} from "react";
import {CheckIcon, SquareChevronDown, TrashIcon} from "lucide-react";
import {IconsProps, SelectItem} from "./types";
import {Chip} from "../Chips/Chip";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";

export interface MultiSelectProps {
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

    className?: string
}


export const MultiSelect = ({...props}: MultiSelectProps) => {
    const [open, setOpen] = useState(false)
    const targetRef = useRef(null)

    const toggleSelect = (value: SelectItem) => {
        if(props.value.some(x=>x.value === value.value)){
            props.onSelect(props.value.filter(x => x.value !== value.value))
        }
        else{
            props.onSelect([...props.value, value]);
        }
        setOpen(false);
    }


    return <div className={"flex flex-wrap items-center gap-2 border rounded px-2 py-1 max-h-[200px]" +
        "overflow-y-auto " + (props.className ? props.className : '')} >
        <Popover>
            <PopoverTrigger>
                <SquareChevronDown
                    className={"cursor-pointer p-1 hover:bg-accent hover:text-accent-foreground rounded"}
                    size={25}
                    onClick={() => setOpen(x=>!x)}
                />
            </PopoverTrigger>
            <PopoverContent align="start">
                <div className={"space-y-1 max-h-[400px] overflow-y-auto"}>
                    {props.items.map(x => <div
                        className={"hover:bg-accent hover:text-accent-foreground p-1 rounded cursor-pointer flex items-center " +
                            "justify-between data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground" +
                            "  max-h-[200px] overflow-y-auto"}
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
            </PopoverContent>
        </Popover>

        {
            props
                .value
                .map((x, i) => <Chip
                    key={i}
                    actions={[
                        <TrashIcon
                            className={"hover:bg-destructive hover:text-destructive-foreground rounded p-1 cursor-pointer"}
                            size={props.icons?.sizes?.remove || 20}
                            onClick={() => toggleSelect(x)}
                        />
                    ]}
                >
                    {x.view || x.label}
                </Chip>)
        }
    </div>
}
