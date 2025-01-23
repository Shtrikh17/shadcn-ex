import React from "react"



export interface StringChipsInputProps {
    /** Array of chip values */
    chips: string[],

    /** Add chip */
    onChange: (data: string[]) => void,

    /** Max number of visible chips */
    maxChips?: number,

    /** Input placeholder */
    placeholder?: string,

    /** Input disabled */
    disabled?: boolean,

    /** Add on leave focus */
    addOnLeave?: boolean

    /** Hotkeys */
    keys?: string[]

    /** Errors */
    errors?: {
        alreadyChosen?: string
    }

    /** Icons */
    icons?: IconsProps
}