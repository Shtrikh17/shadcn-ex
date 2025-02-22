import React, {useState} from "react"
import {PlusIcon, TrashIcon} from "lucide-react";
import {Table, TableRow, TableCell, TableHead, TableHeader, TableBody} from "@/components/ui/table";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";

export type StringsGroup = {[key: string]: string}

interface UiStrings {
    addString?: string
    actions?: string
    applyString?: string
}

export interface StringsGroupInputProps {
    value: Array<StringsGroup>
    onChange: (f: (s: Array<StringsGroup>) => Array<StringsGroup>) => any
    placeholders?: StringsGroup
    keys: Array<string>
    labels: Array<string>
    caption?: string
    uiStrings?: UiStrings
}

export const StringsGroupInput = (props: StringsGroupInputProps) => {
    const onAdd = (v: {[key:string]: string}) => {
        props.onChange(s => [...s, v])
    }

    const onDelete = (v: number) => {
        props.onChange(s => s.filter((x,i) => i !== v))
    }

    return <div>
        <div>
            <AddSetButton
                caption={props.caption}
                keys={props.keys}
                labels={props.labels}
                onAdd={onAdd}
            />
        </div>
        {
            props.value.length
                ? <Table>
                    <TableHeader>
                        <TableRow>
                            {
                                props.labels.map((x,j) => <TableHead key={j}>{x}</TableHead>)
                            }
                            <TableHead className={"w-[200px]"}>{props.uiStrings?.actions || 'Actions'}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            props.value.map((x, i) => <TableRow key={i}>
                                {
                                    props.keys.map((key,j) => <TableCell key={j}>
                                        {x[key]}
                                    </TableCell>)
                                }
                                <TableCell>
                                    <TrashIcon
                                        size={25}
                                        className={"cursor-pointer p-1 hover:bg-destructive rounded hover:text-white"}
                                        onClick={() => onDelete(i)}
                                    />
                                </TableCell>
                            </TableRow>)
                        }
                    </TableBody>
                </Table>
                : null
        }
    </div>
}

const AddSetButton = (props: {
    caption?: string
    keys: Array<string>
    labels: Array<string>
    onAdd: (s: {[key: string]: string}) => any
    uiStrings?: UiStrings
}) => {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState<{[key:string]: string}>({})

    const submit = () => {
        props.onAdd(value)
        setOpen(false)
        setValue({})
    }

    return <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild={true}>
            <Button>
                <PlusIcon
                    size={25}
                />
                <span>{props.uiStrings?.addString || 'Add'}</span>
            </Button>
        </PopoverTrigger>
        <PopoverContent className={"min-w-[600px]"}>
            <div className={"text-xl"}>{props.caption}</div>
            <div className={"grid grid-cols-2 gap-2"}>
                {
                    props.keys.map((key, i) => <React.Fragment key={i}>
                        <div>{props.labels[i]}</div>
                        <Input
                            type={"text"}
                            value={value?.[key] || ''}
                            onChange={e => setValue({...value, [key]: e.target.value})}
                            onKeyDown={e => e.key === 'Enter' && submit()}
                        />
                    </React.Fragment>)
                }
            </div>
            <div className={"flex items-center justify-end mt-2"}>
                <Button onClick={submit}>{props.uiStrings?.applyString || 'Add'}</Button>
            </div>
        </PopoverContent>
    </Popover>
}