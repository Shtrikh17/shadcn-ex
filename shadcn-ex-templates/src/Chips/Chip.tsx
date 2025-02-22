import React from 'react';

export interface ChipProps {
    /** Chip content */
    children: string | React.ReactNode,

    /** ClassName appended to wrapper */
    className?: string

    /** A list of nodes appended as flex items after children */
    actions?: React.ReactNode[]
}

export const Chip = (props: ChipProps) => {
    return <div className={"px-2 py-1 border-solid rounded border-[1px] border-lightgray inline-block items-center justify-center"}>
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
