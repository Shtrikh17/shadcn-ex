import React, { useRef, KeyboardEvent, useState } from 'react';
import "./StringChipsInput.scss"
import {Chip} from "../Chip"
import {IconsProps, StringChipsInputProps} from "./StringChipsInput.types";
import {Plus, TrashIcon} from "lucide-react";
import {ChipList} from "../ChipList";

export const StringChipsInput = ({addOnLeave=false, keys=["Enter", ",", ";"], ...props}: StringChipsInputProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [value, setValue] = useState('')

    const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if(keys.includes(event.key)){
            event.preventDefault();
            addChip();
        }
    };

    const onBlur = () => {
        if(addOnLeave && value.length){
            addChip()
        }
    }

    const addChip = () => {
        const trimmedValue = value.trim();
        if (trimmedValue !== '' && !props.chips.includes(trimmedValue)) {
            props.onChange([...props.chips, trimmedValue])
            setValue('');
        }
    };

    const removeChip = (chipToRemove: string) => {
        const updatedChips = props.chips.filter((chip) => chip !== chipToRemove);
        props.onChange(updatedChips);
    };

    return (
        <div className="scotch-chip-input">
            <div className={"scotch-chip-input-area"}>
                <input
                    placeholder={props.placeholder}
                    disabled={props.disabled}
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    onKeyDown={handleInputKeyDown}
                    onBlur={onBlur}
                />
                <Plus
                    className={"scotch-chip-input-icon"}
                    size={props.icons?.sizes?.add || 20}
                    onClick={addChip}
                />
            </div>
            <div className={"scotch-chip-input-error"}>
                {
                    props.chips.some(x => x === value.trim())
                        ? (props?.errors?.alreadyChosen || "Value already chosen")
                        : null
                }
            </div>
            <ChipList maxChips={props.maxChips}>
                {
                    props
                        .chips
                        .map((x, i) => <Chip
                            key={i}
                            actions={[
                                <TrashIcon
                                    className={"scotch-chip-input-danger"}
                                    size={props.icons?.sizes?.remove || 15}
                                    onClick={() => removeChip(x)}
                                />
                            ]}
                        >
                            {x}
                        </Chip>)
                }
            </ChipList>
        </div>
    );
};

export const _icons = (props: IconsProps) => <div></div>