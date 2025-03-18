import { useRef } from "react";
import React from "react";

export interface UploadButtonProps{
    onUpload: (data: FileList) => Promise<any>
    children: React.ReactNode
}


export const UploadButton = (props: UploadButtonProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const onUpload = (e: any) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            props.onUpload(files)
                .then(() => e.target.value = '')
        }
    }

    return <div>
        <input type={"file"} ref={inputRef} multiple={true} style={{display: "none"}} onChange={onUpload} />
        <div className={"scotch-upload-button-inner-button"} onClick={() => {
            if(inputRef.current)
                inputRef?.current.click()
        }}>{props.children}</div>
    </div>
}
