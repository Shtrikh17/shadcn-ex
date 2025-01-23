import React, {useState} from "react"
import {Meta, StoryObj} from "@storybook/react";
import {StringsListInput} from "../../Input/StringsListInput";

const meta: Meta<typeof StringsListInput> = {
    component: StringsListInput,
    title: "Input/StringsListInput"
}

export default meta
type Story = StoryObj<typeof StringsListInput>

export const Example = () => {
    const [chips, setChips] = useState(['test'])

    return <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
        <StringsListInput onChange={setChips} addOnLeave={true}  strings={chips}/>
    </div>

}