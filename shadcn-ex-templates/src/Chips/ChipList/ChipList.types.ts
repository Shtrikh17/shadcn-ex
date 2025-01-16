import React, {ReactElement} from "react"
import {ChipProps} from "../Chip/Chip.types";

export interface ChipListProps {
    /** Max number of visible chips */
    maxChips?: number,

    /** Chips values */
    children: ReactElement<ChipProps>[],
}