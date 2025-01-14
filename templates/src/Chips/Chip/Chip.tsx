import React from 'react';
import {ChipProps} from "./Chip.types";

export const Chip = (props: ChipProps) => {
    return <div className={"px-2 border-solid rounded border-[1px] border-lightgray inline-block items-center justify-center"}>
        <div className={"flex items-center gap-4"}>
            <div>{props.children}</div>
            {
                props.actions?.map((a,i) => <div
                    key={i}
                    className={"flex items-center justify-center gap-2"}
                >
                    {a}
                </div>)
            }
        </div>
    </div>
}
