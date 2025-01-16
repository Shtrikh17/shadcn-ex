
export interface AutoCompleteProps{
    items: Array<string>,
    width?: string,
    placeholder?: string
    searchValue: string,
    onSearch: (value: string) => void,
}