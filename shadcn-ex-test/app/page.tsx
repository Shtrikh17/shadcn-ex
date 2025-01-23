'use client'
import React, {useState} from "react"
import Image from "next/image";
import {SimpleSelect} from "@/components/shadcn-ex/Select/SimpleSelect";
import {SelectItem} from "@/components/shadcn-ex/Select/types";
import {useTheme} from "next-themes";
import {Switch} from "@/components/ui/switch";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {ChipList} from "@/components/shadcn-ex/Chips/ChipList";
import { Chip } from "@/components/shadcn-ex/Chips/Chip";
import {SearchSelect} from "@/components/shadcn-ex/Select/SearchSelect";

export const SearchSelectEx = () => {
    const [value, setValue] = useState<SelectItem | null>(null)
    const [searchValue, setSearchValue] = useState('')
    const [filteredItems, setFilteredItems] = useState<Array<SelectItem>>([])

    const items: SelectItem[] = [
        {
            value: '0',
            label: "Item 0"
        },
        {
            value: '1',
            label: "Item 1"
        },
        {
            value: '2',
            label: "Item 2"
        },
        {
            value: '3',
            label: "Item 3"
        }
    ]

    const onSearch = (x: string) => {
        setSearchValue(x)
        setFilteredItems(items.filter(item => item.label.includes(x)))
    }
    const onSelect = (x: SelectItem) => {
        setValue(x)
    }

    return <div style={{width: "300px", display: "flex", alignItems: "center", justifyContent: "center"}}>
        <SearchSelect items={filteredItems} onSelect={onSelect} value={value} nullable={true} placeholder={'test'}
                      searchValue={searchValue}
                      onSearchValueChange={onSearch}
        />
    </div>
}


export default function Home() {
  const [value, setValue] = React.useState<SelectItem|null>(null);
    const { setTheme, theme } = useTheme()

  return <div>
      <div className="p-2">
          <Switch checked={theme === 'dark'} onCheckedChange={(e) => setTheme(e ? 'dark' : 'light')} />
      </div>
      <div className="w-[200px] p-2">

          <Popover>
              <PopoverTrigger>
                  <div>TRIGGER</div>
              </PopoverTrigger>
              <PopoverContent>
                  <SimpleSelect
                      items={[
                          {label: "Test", value: "test"},
                          {label: "Test2", value: "test2"}
                      ]}
                      onSelect={setValue}
                      value={value}
                  />
              </PopoverContent>
          </Popover>
      </div>

      <div className="p-2 mt-2">

          <ChipList maxChips={3}>
              <Chip>Chip 1</Chip>
              <Chip>Chip 2</Chip>
              <Chip>Chip 3</Chip>
              <Chip>Chip 4</Chip>
          </ChipList>
      </div>

      <SearchSelectEx />
  </div>
}
