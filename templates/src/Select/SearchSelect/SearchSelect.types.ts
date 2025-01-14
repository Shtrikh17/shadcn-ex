import {SelectItem} from "../types"

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


