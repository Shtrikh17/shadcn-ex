import React, {useState} from "react"
import {Meta, StoryObj} from "@storybook/react";
import {StringChipsInput} from "./StringChipsInput";

const meta: Meta<typeof StringChipsInput> = {
    component: StringChipsInput,
    title: "Chips/StringChipsInput"
}

export default meta
type Story = StoryObj<typeof StringChipsInput>

export const Example = () => {
    const [chips, setChips] = useState(['test'])

    return <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
        <StringChipsInput chips={chips} onChange={setChips} addOnLeave={true} />
    </div>

}