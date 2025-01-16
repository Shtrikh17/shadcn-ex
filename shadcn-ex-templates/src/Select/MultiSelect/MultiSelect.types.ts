import {SelectItem} from "../types"
import {IconsProps} from "../../Chips/StringChipsInput/StringChipsInput.types";

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
}

