import React, {useEffect, useRef, useState} from "react"
import {Meta, StoryObj} from "@storybook/react";
import {SearchSelect} from "./SearchSelect.tsx"
import {SelectItem} from "../types";
import * as Dialog from "@radix-ui/react-dialog";

const meta: Meta<typeof SearchSelect> = {
    component: SearchSelect
}

export default meta
type Story = StoryObj<typeof SearchSelect>

export const Example = () => {
    const [value, setValue] = useState<SelectItem | null>(null)
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
    const onSelect = (x: SelectItem) => {
        setValue(x)
    }

    return <div style={{width: "300px", display: "flex", alignItems: "center", justifyContent: "center"}}>
        <SearchSelect items={filteredItems} onSelect={onSelect} value={value} nullable={true} placeholder={'test'}
                      searchValue={searchValue}
                      onSearchValueChange={onSearch}
                      container={document.body}
        />
    </div>
}



export const ExampleWithModal = () => {
    const ref = useRef(null)
    const [value, setValue] = useState<SelectItem | null>(null)
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
    const onSelect = (x: SelectItem) => {
        setValue(x)
    }

    return <Dialog.Root>
        <Dialog.Trigger>
            OPEN
        </Dialog.Trigger>
        <Dialog.Portal>
            <Dialog.Overlay className={"DialogOverlay"} />
            <Dialog.Content className={"DialogContent"}>
                <Dialog.Title className={"DialogTitle"}>Demo</Dialog.Title>
                <div ref={ref}></div>
                <Dialog.Description className={"DialogDescription"}>
                    <SearchSelect items={filteredItems} onSelect={onSelect} value={value} nullable={true} placeholder={'test'}
                                  searchValue={searchValue}
                                  onSearchValueChange={onSearch}
                                  container={ref.current}
                    />
                    <div>TESTTEST</div>
                    <input placeholder={"Test"} />
                </Dialog.Description>
            </Dialog.Content>
        </Dialog.Portal>
    </Dialog.Root>
}