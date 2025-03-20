import React from "react"
import ReactPaginate from "react-paginate"
import {ChevronLeftIcon, ChevronRightIcon} from "lucide-react";

export interface PaginationProps{
    totalCount: number
    offset: number
    pageSize: number
    onOffsetChange: (offset: number) => void
}

export const Pagination = (props: PaginationProps) => {

    const pageCount = React.useMemo(() => {
        return Math.ceil(props.totalCount / props.pageSize)
    }, [props.totalCount, props.pageSize])

    const handlePageClick = (selectedItem: {selected: number}) => {
        props.onOffsetChange(selectedItem.selected * props.pageSize)
    }

    const page = React.useMemo(() => {
        return Math.floor(props.offset/(props.pageSize))
    }, [props.pageSize, props.offset])

    return <ReactPaginate
        breakLabel="..."
        pageLinkClassName={"hover:bg-primary p-1 rounded hover:text-white w-[30px] text-center block"}
        previousClassName={"hover:bg-primary p-1 hover:text-white rounded"}
        nextClassName={"hover:bg-primary p-1 hover:text-white rounded"}
        activeClassName={"bg-accent rounded"}
        nextLabel={<ChevronRightIcon size={20} />}
        onPageChange={handlePageClick}
        forcePage={page}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel={<ChevronLeftIcon size={20} />}
        renderOnZeroPageCount={null}
        className={"flex gap-4 items-center justify-center"}
    />
}