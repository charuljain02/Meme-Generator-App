import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Text from "../components/Text";
import { useSearchParams } from "react-router-dom";
import { toJpeg } from "html-to-image";

const EditPage = () => {
    const [params] = useSearchParams();
    const [count, setCount] = useState(0);
    const memeRef = useRef(null);

    const addText = () => {
        setCount(count + 1);
    };

    const saveMeme = async () => {
        if (!memeRef.current) return;

        const dataUrl = await toJpeg(memeRef.current, { quality: 0.95 });
        const link = document.createElement("a");
        link.download = "meme.jpeg";
        link.href = dataUrl;
        link.click();
    };

    return (
        <div>
            <div
                ref={memeRef}
                style={{ width: "250px", border: "1px solid" }}
                className="meme mt-5 mb-5"
            >
                <img src={params.get("url")} width="250px" alt="" />
                {Array(count)
                    .fill(0)
                    .map((_, i) => (
                        <Text key={i} />
                    ))}
            </div>

            <Button onClick={addText}>Add Text</Button>

            <Button variant="success" onClick={saveMeme}>
                Save
            </Button>
        </div>
    );
};

export default EditPage;
