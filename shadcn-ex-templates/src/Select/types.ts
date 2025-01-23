import React from "react"

export interface SelectItem{
    value: string
    label: string
    view?: React.ReactNode
}

export interface IconsProps{
    sizes?: {
        remove?: number,
        add?: number
    }
}