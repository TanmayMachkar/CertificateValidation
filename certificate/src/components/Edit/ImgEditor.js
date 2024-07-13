import React from "react";
import ImageEditor from "@toast-ui/react-image-editor";
import "tui-image-editor/dist/tui-image-editor.css";
import Button from '../Button/Button';

const customTheme = {
  "header.display": "none",
  "common.backgroundColor": "#ddd",
};

const ImgEditor = ({ tui, logImageUrl, initImg }) => {
  return (
    <>
      <Button type = 'submit' onClick={logImageUrl} label = '☑️ Done' />
      <div className = 'pl5'>
          <ImageEditor
            key={"img"}
            ref={tui}
            includeUI={{
              loadImage: {
                path: initImg,
                name: "SampleImage",
              },
              theme: customTheme,
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
        </div>
    </>
  );
};

export default ImgEditor;