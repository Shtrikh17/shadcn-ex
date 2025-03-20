import { useRef } from "react";
import React from "react";

interface UploadButtonPropsSingle {
    onUpload: (data: File) => Promise<any>;
    children: React.ReactNode;
    mode?: "single";
}

interface UploadButtonPropsMultiple {
    onUpload: (data: FileList) => Promise<any>;
    children: React.ReactNode;
    mode: "multiple";
}

type UploadButtonProps = UploadButtonPropsSingle | UploadButtonPropsMultiple;

export const UploadButton = (props: UploadButtonProps) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target; // ✅ Get the input element
        const files = input.files;
        if (!files || files.length === 0) return;

        if (props.mode === "single") {
            props.onUpload(files[0]) // ✅ Ensures `File` is passed
                .then(() => (input.value = "")); // ✅ Reset input after upload
        } else if (props.mode === "multiple") {
            props.onUpload(files) // ✅ Ensures `FileList` is passed
                .then(() => (input.value = ""));
        }
    };

    return (
        <div>
            <input
                type="file"
                ref={inputRef}
                multiple={props.mode === "multiple"}
                style={{ display: "none" }}
                onChange={onUpload}
            />
            <div
                onClick={() => inputRef.current?.click()}
            >
                {props.children}
            </div>
        </div>
    );
}
