import React, {ReactNode} from "react"
import {ChipListProps} from "./ChipList.types";
import "./ChipList.scss"
import * as Popover from "@radix-ui/react-popover"

export const ChipList = (props: ChipListProps) => {
    let items: Array<ReactNode> = []
    let bound = props.children.length > props.maxChips ? props.maxChips : props.children.length;
    for(let i = 0; i < bound; i++){
        items.push(<React.Fragment key={i}>{props.children[i]}</React.Fragment>)
    }
    if(bound < props.children.length) items.push(
            <Popover.Root>
                <Popover.Trigger asChild={true}>
                    <button className={"scotch-chip-list-dots"}>
                        ...
                    </button>
                </Popover.Trigger>
                <Popover.Portal>
                    <Popover.Content>
                        <div className={"scotch-chip-list scotch-chip-popover"}>
                            {
                                props
                                    .children
                                    .slice(bound)
                                    .map((x: ReactNode, i: number) => <React.Fragment key={i}>{x}</React.Fragment>)
                            }
                        </div>
                        <Popover.Arrow />
                    </Popover.Content>
                </Popover.Portal>
            </Popover.Root>
    )


    return <div className={"scotch-chip-list"}>
        {items}
    </div>
}