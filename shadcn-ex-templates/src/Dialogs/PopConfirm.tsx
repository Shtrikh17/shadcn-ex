import React from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";


export interface PopConfirmProps {
    /** Action to run on confirm */
    onOk: () => void,

    /** Action to run on cancel */
    onCancel: () => void,

    /** Caption */
    caption?: string,

    /** Label for confirm button */
    okLabel?: string,

    /** Label for cancel button */
    cancelLabel?: string,

    /** Variant of confirm button */
    variant?: "destructive" | "secondary" | "outline",

    /** Trigger node. Note: it must not be button */
    children: React.ReactNode

    /** Popover align */
    align?: "start" | "center" | "end"

    /** Popover side */
    side?: "top" | "right" | "bottom" | "left"
}

export const PopConfirm = (props: PopConfirmProps) => {
    const [open, setOpen] = React.useState(false)

    const cancel = async () => {
        setOpen(false)
        props.onCancel()
    }

    const ok = async () => {
        setOpen(false)
        props.onOk()
    }

    return <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <button>{props.children}</button>
        </PopoverTrigger>
        <PopoverContent align={props.align} side={props.side}>
            <div>{props.caption || 'Are you sure?'}</div>
            <div className={"mt-2 flex justify-end gap-2"}>
                <Button variant={"outline"} onClick={cancel}>{props.cancelLabel || "Cancel"}</Button>
                <Button variant={props.variant || "default"} onClick={ok}>{props.okLabel || "Yes"}</Button>
            </div>
        </PopoverContent>
    </Popover>
}