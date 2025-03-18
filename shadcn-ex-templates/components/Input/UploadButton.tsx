import {useRef, ReactNode, ChangeEvent} from "react";


interface UploadMultipleButtonProps{
    onUpload: (data: FileList) => Promise<unknown>
    children: ReactNode
    mode: "multiple"
}

interface UploadSingleButtonProps{
    onUpload: (data: File) => Promise<unknown>
    children: ReactNode
    mode: "single"
}

export type UploadButtonProps = UploadMultipleButtonProps | UploadSingleButtonProps


export const UploadButton = (props: UploadButtonProps) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const onUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        if (props.mode === "single") {
            props.onUpload(files[0]) // ✅ Ensures `File` is passed
                .then(() => (e.target.value = "")); // Reset input after upload
        } else {
            props.onUpload(files) // ✅ Ensures `FileList` is passed
                .then(() => (e.target.value = ""));
        }
    }

    return <div>
        <input
            type={"file"}
            ref={inputRef}
            multiple={props.mode === "multiple"}
            style={{display: "none"}}
            onChange={onUpload}
        />
        <div onClick={() => inputRef?.current.click()}>
            {props.children}
        </div>
    </div>
}
