import React from "react"


export interface ChipProps {
    /** Chip content */
    children: string | React.ReactNode,

    /** ClassName appended to wrapper */
    className?: string

    /** A list of nodes appended as flex items after children */
    actions?: React.ReactNode[]
}
