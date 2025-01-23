import {PlusIcon, TrashIcon} from "lucide-react";
import {Input} from "@/components/ui/input";
import {useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {ChipList} from "../Chips/ChipList";
import {Chip} from "../Chips/Chip";
import {Button} from "@/components/ui/button";

export interface StringListInputProps{
    strings: Array<string>,
    onChange: (s: Array<string>) => void,
    caption?: string
    validator?: string
    uiStrings?: UIStrings
}

export interface UIStrings {
    validationOk?: string
    validationError?: string
    valueRequired?: string
    addString?: string
    apply?: string
}


export const StringsListView = (props: {strings: Array<string>}) => {
    return (
        <div className={"flex flex-wrap gap-1 items-center"}>
            {
                props.strings.map((s, i) => <Chip key={i}>{s}</Chip>)
            }
        </div>
    )
}

const AddNewStringButton = (props: {
    onSubmit: (x: string) => void,
    caption?: string
    validator?: RegExp,
    uiStrings?: UIStrings
}) => {
    const [value, setValue] = useState('')
    const [error, setError] = useState('')
    const [open, setOpen] = useState(false)

    const submit = () => {
        if (props.validator && !props.validator.test(value)) {
            setError(props.uiStrings?.validationError || ("Invalid value: " + props.validator.source))
            return
        }
        if (!value) {
            setError(props.uiStrings?.valueRequired || "Value is required")
            return
        }
        props.onSubmit(value)
        setValue('')
        setError('')
    }

    return <div>
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild={true}>
                <PlusIcon
                    className={"cursor-pointer p-1 rounded hover:bg-accent hover:text-accent-foreground"}
                    size={25}
                    onClick={() => setOpen(true)}
                />
            </PopoverTrigger>
            <PopoverContent align={"start"}>
                <div className={"text-2xl text-card-foreground mb-2"}>{props.uiStrings?.addString || "Add string"}</div>
                {
                    props.caption ? <span className={"text-sm my-2"}>{props.caption}</span> : null
                }
                <Input
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && submit()}
                />
                {
                    error ? <span className={"text-sm text-destructive"}>{error}</span> : null
                }
                <div className={"flex justify-end items-center mt-2"}>
                    <Button onClick={submit}>{props.uiStrings?.apply || "Apply"}</Button>
                </div>
            </PopoverContent>
        </Popover>
    </div>
}

export const StringsListInput = (props: StringListInputProps) => {

    return (
        <div className={"flex flex-wrap gap-1 items-center mt-2"}>
            <AddNewStringButton
                onSubmit={s => props.onChange([...props.strings, s])}
                uiStrings={props.uiStrings}
            />
            <ChipList>
                {
                    props.strings.map((s, i) => <Chip key={i} actions={[
                        <TrashIcon
                            className={"hover:bg-destructive hover:text-destructive-foreground rounded p-1 cursor-pointer"}
                            size={20}
                            onClick={() => props.onChange(props.strings.filter((x, j) => i !== j))}
                            key={1}
                        />
                    ]}>{s}</Chip>)
                }
            </ChipList>
        </div>
    )
}