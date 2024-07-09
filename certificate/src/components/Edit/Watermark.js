import React from "react";
import { PixelBinImage } from "@pixelbin/react"

const Watermark = ({inlineResult}) => {
    // Any PixelBin Image URL
    const imgUrl = "https://cdn.pixelbin.io/v2/cloudname-dummy/aaCCyy/erase.bg()~t.resize(h:100,w:100)/sampleImage.jpeg"

    return (
        <PixelBinImage
            url={inlineResult}
            retryOpts={{
                retries: 2,
                interval: 100
            }}
        />
    )
}

export default Watermark;