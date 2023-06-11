import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import React from "react";

const fontColorConfig = {
  colors: [
    {
      color: "hsl(0, 0%, 0%)",
      label: "Black",
    },
    {
      color: "hsl(0, 0%, 30%)",
      label: "Dim grey",
    },
    {
      color: "hsl(0, 0%, 60%)",
      label: "Grey",
    },
    {
      color: "hsl(0, 0%, 90%)",
      label: "Light grey",
    },
    {
      color: "hsl(0, 0%, 100%)",
      label: "White",
      hasBorder: true,
    },
    {
      color: "hsl(0, 75%, 60%)",
      label: "Red",
    },
    {
      color: "hsl(30, 75%, 60%)",
      label: "Orange",
    },
    {
      color: "hsl(60, 75%, 60%)",
      label: "Yellow",
    },
    {
      color: "hsl(90, 75%, 60%)",
      label: "Light green",
    },
    {
      color: "hsl(120, 75%, 60%)",
      label: "Green",
    },
    {
      color: "hsl(150, 75%, 60%)",
      label: "Aquamarine",
    },
    {
      color: "hsl(180, 75%, 60%)",
      label: "Turquoise",
    },
    {
      color: "hsl(210, 75%, 60%)",
      label: "Light blue",
    },
    {
      color: "hsl(240, 75%, 60%)",
      label: "Blue",
    },
    {
      color: "hsl(270, 75%, 60%)",
      label: "Purple",
    },
  ],
};

const Editor = () => {
  return (
    <CKEditor editor={ClassicEditor} data={"<p> Content </p>"} config={{}} />
  );
};

export default Editor;
