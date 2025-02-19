import React, {ReactElement, ReactNode} from "react"
import {ChipProps} from "./Chip";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";

export interface ChipListProps {
    /** Max number of visible chips */
    maxChips?: number,

    /** Chips values */
    children: ReactElement<ChipProps>[] | ReactElement<ChipProps>,
}

export const ChipList = (props: ChipListProps) => {
    const elements = Array.isArray(props.children) ? props.children : [props.children];

    let items: Array<ReactNode> = []
    let bound = elements.length;
    if(props.maxChips && elements.length > props.maxChips){
        bound = props.maxChips;
    }

    for(let i = 0; i < bound; i++){
        items.push(<React.Fragment key={i}>{elements[i]}</React.Fragment>)
    }
    if(bound < elements.length) items.push(
        <Popover key={'...'}>
            <PopoverTrigger>
                <div>...</div>
            </PopoverTrigger>
            <PopoverContent>
                <div className={"flex gap-1 flex-wrap"}>
                    {
                        elements
                            .slice(bound)
                            .map((x: ReactNode, i: number) => <React.Fragment key={i}>{x}</React.Fragment>)
                    }
                </div>
            </PopoverContent>
        </Popover>
    )


    return <div className={"flex gap-1 flex-wrap"}>
        {items}
    </div>
}