"use client";
import React, { CSSProperties, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
interface IProps {
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
  style?: CSSProperties;
  height?: number;
  handleBlur?: () => void;
}

const RichTextArea: React.FC<IProps> = ({
  className,
  defaultValue,
  onChange,
  style,
  height,
  handleBlur,
}) => {
  const editorHeight = height || 400;

  const [value, setValue] = useState(defaultValue || "");
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["link", "video", "formula", "image"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];

  return (
    <ReactQuill
      modules={{
        toolbar: toolbarOptions,
      }}
      // onChangeSelection={(...arg) => {
      //   console.log(arg);
      // }}
      style={{
        height: editorHeight + "px",
        ...style,
      }}
      onBlur={handleBlur}
      className={className || ""}
      theme="snow"
      value={value}
      onChange={(content) => {
        setValue(content);

        if (onChange) onChange(content);
      }}
    />
  );
};

export default RichTextArea;
