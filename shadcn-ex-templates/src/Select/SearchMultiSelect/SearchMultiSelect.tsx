import React, {useRef, useState} from "react";
import "./SearchMultiSelect.scss"
import {SearchMultiSelectProps} from "./SearchMultiSelect.types";
import {CheckIcon, ChevronDown, TrashIcon} from "lucide-react";
import {SelectItem} from "../types";
import * as Popover from "@radix-ui/react-popover"
import {ChipList} from "../../Chips/ChipList";
import {Chip} from "../../Chips/Chip";

export const SearchMultiSelect = ({collapseOnSelect=false, ...props}: SearchMultiSelectProps) => {
    const targetRef = useRef(null)
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

    return <div className={"scotch-select-multi-container"}>
        <div className={"scotch-select-multi"} ref={targetRef}>
        <Popover.Root open={searchActive && !!props.items.length} onOpenChange={setSearchActive} >
            <Popover.Trigger style={{display: 'none'}}/>
            <Popover.Anchor asChild>
                <div className={"scotch-search-select-multi-input"} onClick={() => setSearchActive(true)} >
                    <div className={"scotch-search-select-multi-input-value"}>
                        <input
                            className={"scotch-search-select-multi-input-input"}
                            onChange={e => props.onSearchValueChange(e.target.value)}
                            value={!searchActive ? '' : props.searchValue}
                            placeholder={props.caption}
                            onFocus={() => onStartSearch()}
                        />
                    </div>
                    <ChevronDown size={20} />
                </div>
            </Popover.Anchor>
            <Popover.Portal>
                <Popover.Content
                    className={"scotch-search-select-multi-popover"}
                    onOpenAutoFocus={e => {
                        e.preventDefault()
                    }}
                >
                    <div>
                        {props.items.map(x => <div
                            className={"scotch-search-select-multi-popover-item"}
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
