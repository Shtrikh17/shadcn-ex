import React, {useState} from "react"
import {Meta, StoryObj} from "@storybook/react";
import {SearchMultiSelect} from "../../Select/SearchMultiSelect.tsx"
import {SelectItem} from "../../Select/types";

const meta: Meta<typeof SearchMultiSelect> = {
    component: SearchMultiSelect,
    title: "Select/SearchMultiSelect"
}

export default meta
type Story = StoryObj<typeof SearchMultiSelect>

export const Example = () => {
    const [value, setValue] = useState<SelectItem[]>([])
    const [searchValue, setSearchValue] = useState('')
    const [filteredItems, setFilteredItems] = useState<Array<SelectItem>>([])

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

    const onSearch = (x: string) => {
        setSearchValue(x)
        setFilteredItems(items.filter(item => item.label.includes(x)))
    }

    const onSelect = (x: SelectItem[]) => {
        setValue(x)
    }

    return <div>
        <SearchMultiSelect
            items={filteredItems}
            onSelect={onSelect}
            value={value}
            placeholder={'Search'}
            searchValue={searchValue}
            onSearchValueChange={onSearch}
        />
    </div>
}

