// @ts-ignore
import React, {useEffect, useState} from "react"
import {Meta, StoryObj} from "@storybook/react";
import {SimpleSelect} from "../../Select/SimpleSelect"
import {SelectItem} from "../../Select/types";
import * as Dialog from "@radix-ui/react-dialog"
import "./Story.scss"

const meta: Meta<typeof SimpleSelect> = {
    component: SimpleSelect,
    title: 'Select/SimpleSelect',
}

export default meta
type Story = StoryObj<typeof SimpleSelect>

export const Example = () => {
    const [value, setValue] = useState<SelectItem | null>(null)

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

    const onSelect = (x: SelectItem) => {
        setValue(x)
    }

    return <div style={{width: "300px", display: "flex", alignItems: "center", justifyContent: "center"}}>
        <SimpleSelect items={items} onSelect={onSelect} value={value} nullable={true} placeholder={'test'} />
    </div>
}


export const ExampleWithModal = () => {
    const [value, setValue] = useState<SelectItem | null>(null)

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

    const onSelect = (x: SelectItem) => {
        setValue(x)
    }

    return <Dialog.Root>
        <Dialog.Trigger>
            <div className={"DialogTrigger"}>OPEN</div>
        </Dialog.Trigger>
        <Dialog.Portal>
            <Dialog.Overlay className={"DialogOverlay"} />
            <Dialog.Content className={"DialogContent"}>
                <Dialog.Title className={"DialogTitle"}>Demo</Dialog.Title>
                <Dialog.Description className={"DialogDescription"}>
                    <SimpleSelect items={items} onSelect={onSelect} value={value} nullable={true} placeholder={'test'} />
                </Dialog.Description>
            </Dialog.Content>
        </Dialog.Portal>
    </Dialog.Root>
}