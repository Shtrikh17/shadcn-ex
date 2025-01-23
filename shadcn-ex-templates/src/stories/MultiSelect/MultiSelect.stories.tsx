// @ts-ignore
import React, {useState} from "react"
import {Meta, StoryObj} from "@storybook/react";
import {MultiSelect} from "../../Select/MultiSelect"
import {SelectItem} from "../../Select/types";

const meta: Meta<typeof MultiSelect> = {
    component: MultiSelect,
    title: "Select/MultiSelect",
}

export default meta
type Story = StoryObj<typeof MultiSelect>

export const Example = () => {
    const [value, setValue] = useState<SelectItem[]>([])

    const items: SelectItem[] = [
        {
            value: '0',
            label: "Item 0"
        },
        {
            value: '1',
            label: "Item 1"
        },
        {
            value: '2',
            label: "Item 2"
        },
        {
            value: '3',
            label: "Item 3"
        }
    ]

    const onSelect = (x: SelectItem[]) => {
        setValue(x)
    }

    return <div>
        <MultiSelect items={items} onSelect={onSelect} value={value} />
    </div>
}

