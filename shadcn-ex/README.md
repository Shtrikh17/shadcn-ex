# shadcn-ex
This repository contains several projects used to extend the functionality of [shadcn/ui](https://github.com/shadcn-ui/ui) library.
We provide several components which were not present (at least at the time of development) in the original library.

Following sub-projects are included in this repository:
1. **shadcn-ex**: This is the main project which contains the installation component.
2. **shadcn-ex-templates**: This project contains the templates for the installation component and corresponding storybook.
3. **shadcn-ex-test**: A component used mostly for testing purposes.

## Demo
It's better to see the components in action. You can see the demo [here](https://shadcn-ex-storybook-ihc8c2zxn-shtrikh17s-projects.vercel.app/).

## Installation
The library works almost the same way as the original library. The only difference is in the usage of registry. Our library is
tiny and it brings all the code required with it.
```bash
npm install @shtrikh17/shadcn-ex
npx @shtrikh17/shadcn-ex add <ComponentName>
```
That's it. Now you can edit the components the way you want. The components are located in the `components/shadcn-ex` directory (near original `ui` directory).
## Components
| Name               | Description                                                                                                    |
|--------------------|----------------------------------------------------------------------------------------------------------------|
| SimpleSelect       | A simple select component which can be used to select a single value from a list of options.                   |
| MultiSelect        | A multi select component which can be used to select multiple values from a list of options.                   |
| SearchSelect       | A search select component which can be used to search and select a single value from a list of options.        |
| SearchMultiSelect  | A search multi select component which can be used to search and select multiple values from a list of options. |
| AutoComplete       | An auto complete component which can be used to search and select a single value from a list of options.       |
| Chip               | A chip component which can be used to display a single value.                                                  |
| ChipList           | A chip list component which can be used to display multiple values.                                            |
| StringsListInput   | An input component which can be used to input multiple values.                                                 |
| PopConfirm         | A pop confirm component which can be used to confirm an action.                                                |
| UploadButton       | An upload button component which can be used to upload files.                                                  |
| Pagination         | A pagination component which can be used to navigate through pages.                                            |