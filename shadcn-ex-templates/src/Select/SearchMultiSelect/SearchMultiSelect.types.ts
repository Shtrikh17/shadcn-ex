import {SelectItem} from "../types"
import {IconsProps} from "../../Chips/StringChipsInput/StringChipsInput.types";

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

