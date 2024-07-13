import React from "react";
import ImageEditor from "@toast-ui/react-image-editor";
import "tui-image-editor/dist/tui-image-editor.css";

const customTheme = {
  "header.display": "none",
  "common.backgroundColor": "#ddd",
};

const ImgEditor = ({ tui, logImageUrl, initImg }) => {
  return (
    <>
      <button onClick={logImageUrl}>Get Edited Image</button>
      <ImageEditor
        key={"img"}
        ref={tui}
        includeUI={{
          loadImage: {
            path: initImg, //"logo512.png",
            name: "SampleImage",
          },
          theme: customTheme,
          // Edit the menu array to filter out needed menu items for editing
          menu: [
            "shape",
            "filter",
            "text",
            "mask",
            "icon",
            "draw",
            "crop",
            "flip",
            "rotate",
          ],
          initMenu: "filter",
          uiSize: {
            width: "1200px",
            height: "700px",
          },
          menuBarPosition: "bottom",
        }}
        cssMaxHeight={400}
        cssMaxWidth={600}
        selectionStyle={{
          cornerSize: 20,
          rotatingPointOffset: 70,
        }}
        usageStatistics={true}
      />
    </>
  );
};

export default ImgEditor;