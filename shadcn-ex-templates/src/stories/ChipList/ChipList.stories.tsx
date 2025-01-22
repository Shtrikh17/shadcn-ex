// @ts-ignore
import React from "react"
import {Meta, StoryObj} from "@storybook/react";
import {ChipList} from "../../Chips/ChipList";
import {Chip} from "../../Chips/Chip";

const meta: Meta<typeof ChipList> = {
    component: ChipList,
    title: "Chips/ChipList"
}

export default meta
type Story = StoryObj<typeof ChipList>

export const Example = () => {
    const items = [
        "Item 1",
        "Item 2",
        "Item 3",
        "Item 4", "Item 5", "Item 6", "Item 7", "Item 8", "Item 9"
    ]

    return <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
        <ChipList maxChips={2}>
            {items.map(x => <Chip key={x}>{x}</Chip>)}
        </ChipList>
    </div>

}