import React, { useState, useRef } from "react";
import Draggable from "react-draggable";

const Text = ({ id, text, color, fontSize, isImpact, onUpdateText }) => {
    const [editMode, setEditMode] = useState(false);
    const nodeRef = useRef(null); 

    const textStyle = {
        color: color || '#ffffff',
        fontSize: `${fontSize || 28}px`,
        fontFamily: isImpact ? 'Impact, Haettenschweiler, Arial Narrow Bold, sans-serif' : 'sans-serif',
        // Perfect 360-degree text stroke outline so text is ALWAYS legible
        textShadow: isImpact 
            ? '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 3px 3px 5px rgba(0,0,0,0.8)' 
            : '1px 1px 2px rgba(0,0,0,0.8)',
        textTransform: isImpact ? 'uppercase' : 'none',
        cursor: editMode ? 'text' : 'move',
        userSelect: 'none',
        margin: 0,
        padding: '6px 12px',
        display: 'inline-block',
        minWidth: '180px',
        textAlign: 'center',
        background: editMode ? 'transparent' : 'rgba(0, 0, 0, 0.05)',
        borderRadius: '4px',
        border: editMode ? 'none' : '1px dashed rgba(255, 255, 255, 0.2)'
    };

    return (
        <Draggable nodeRef={nodeRef} bounds="parent">
            <div 
                ref={nodeRef} 
                style={{ position: 'absolute', top: '30px', left: '30px', zIndex: 100 }}
            >
                {editMode ? (
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => onUpdateText(id, e.target.value)}
                        onBlur={() => setEditMode(false)}
                        onKeyDown={(e) => { if(e.key === 'Enter') setEditMode(false); }}
                        autoFocus
                        style={{
                            background: '#151824',
                            color: '#ffffff',
                            border: '2px solid #00d2ff',
                            borderRadius: '6px',
                            padding: '6px 12px',
                            fontSize: `${fontSize || 24}px`,
                            textAlign: 'center',
                            outline: 'none',
                            boxShadow: '0 0 15px rgba(0, 210, 255, 0.4)'
                        }}
                    />
                ) : (
                    <h2 onDoubleClick={() => setEditMode(true)} style={textStyle}>
                        {text.trim() === "" ? "Double Click to Edit" : text}
                    </h2>
                )}
            </div>
        </Draggable>
    );
};

export default Text;