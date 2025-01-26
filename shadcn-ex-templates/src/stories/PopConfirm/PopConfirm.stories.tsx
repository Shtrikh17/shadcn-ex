// @ts-ignore
import React from "react"
import {Meta, StoryObj} from "@storybook/react";
import {Chip} from "../../Chips/Chip";
import {PopConfirm} from "../../Dialogs/PopConfirm";

const meta: Meta<typeof PopConfirm> = {
    component: PopConfirm,
    title: "Dialogs/PopConfirm"
}

export default meta
type Story = StoryObj<typeof Chip>

export const SimpleConfirm = () => {
    return <div>
        <PopConfirm
            okLabel={'OK'}
            cancelLabel={'Cancel'}
            onCancel={() => alert('cancel')}
            onOk={() => alert('ok')}
        >
            <Chip>Test</Chip>
        </PopConfirm>
    </div>
}
