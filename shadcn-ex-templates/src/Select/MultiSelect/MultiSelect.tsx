import React, {useRef, useState} from "react";
import "./MultiSelect.scss"
import {MultiSelectProps} from "./MultiSelect.types";
import {CheckIcon, ChevronDown, TrashIcon} from "lucide-react";
import {SelectItem} from "../types";
import * as Popover from "@radix-ui/react-popover"
import {ChipList} from "../../Chips/ChipList/ChipList";
import {Chip} from "../../Chips/Chip/Chip";

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


    return <div className={"scotch-select-multi-container"}>
        <div className={"scotch-select-multi"} ref={targetRef}>
        <Popover.Root open={open} onOpenChange={() => setOpen(false)} >
            <Popover.Trigger style={{display: 'none'}}/>
            <Popover.Anchor asChild>
                <div className={"scotch-select-multi-input"} onClick={() => setOpen(x=>!x)} >
                    <div className={"scotch-select-multi-input-value"}>
                        {props.caption || "Select"}
                    </div>
                    <ChevronDown size={20} />
                </div>
            </Popover.Anchor>
            <Popover.Portal>
                <Popover.Content className={"scotch-select-multi-popover"}>
                    <div>
                        {props.items.map(x => <div
                            className={"scotch-select-multi-popover-item"}
                            onMouseDown={(e) => toggleSelect(x)}
                            key={"d-content-"+x.value}
                            data-selected={props.value.some(y => x.value === y.value)}
                        >
                            <div>{x.view || x.label}</div>
                            {
                                props.value.some(y => x.value === y.value)
                                    ? <CheckIcon size={15} />
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
                                className={"scotch-chip-input-danger"}
                                size={props.icons?.sizes?.remove || 15}
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
