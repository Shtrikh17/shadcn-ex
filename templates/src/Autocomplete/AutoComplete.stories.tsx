import React, {useState} from "react"
import {Meta, StoryObj} from "@storybook/react";
import {AutoComplete} from "./AutoComplete";
import {AutoCompleteItem} from "./AutoComplete.types";

const meta: Meta<typeof AutoComplete> = {
    component: AutoComplete
}

export default meta
type Story = StoryObj<typeof AutoComplete>

export const Example = () => {
    const [searchValue, setSearchValue] = useState('')
    const [variants, setVariants] = useState<Array<string>>([])

    const items = [
        "Item 1",
        "Item 2",
        "Item 3"
    ]

    const onSearch = (s: string) => {
        setSearchValue(s)
        setVariants(items.filter(x => x.includes(s)))
    }

    const onSelect = (x: string) => {
        setSearchValue(x)
    }

    return <div style={{width: "300px", display: "flex", alignItems: "center", justifyContent: "center"}}>
        <AutoComplete items={variants} onSelect={onSelect} placeholder={"Some value"} searchValue={searchValue} onSearch={onSearch} />
    </div>
}
