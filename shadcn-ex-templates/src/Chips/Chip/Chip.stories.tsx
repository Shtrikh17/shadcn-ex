import React from "react"
import {Meta, StoryObj} from "@storybook/react";
import {Chip} from "./Chip";
import {Pencil} from "lucide-react";

const meta: Meta<typeof Chip> = {
    component: Chip,
    title: "Chips/Chip"
}

export default meta
type Story = StoryObj<typeof Chip>

export const ChipExample = () => {
    return <div>
        <Chip>Test</Chip>
    </div>
}

export const ChipAction = () => {
    return <div>
        <Chip
            actions={[
                <Pencil size={20} className="hover:bg-blue-200 rounded p-2 cursor-pointer" />
            ]}
            className={"chip-story"}
        >
            Test
        </Chip>
    </div>
}