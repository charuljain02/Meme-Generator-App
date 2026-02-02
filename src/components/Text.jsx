import React, { useState, useRef } from "react";
import Draggable from "react-draggable";

const Text = () => {
    const [editMode, setEditMode] = useState(false);
    const [val, setVal] = useState("Double Click to Edit");
    const nodeRef = useRef(null); 

    return (
        <Draggable nodeRef={nodeRef}>
            <div ref={nodeRef}>
                {editMode ? (
                    <input
                        value={val}
                        onChange={(e) => setVal(e.target.value)}
                        onBlur={() => setEditMode(false)}
                    />
                ) : (
                    <h1 onDoubleClick={() => setEditMode(true)}>
                        {val}
                    </h1>
                )}
            </div>
        </Draggable>
    );
};

export default Text;
