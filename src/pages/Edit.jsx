import React, { useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { toJpeg } from "html-to-image";
import Text from "../components/Text";
import { saveMemeToLocal } from "../utils/storage";
import './Edit.css';

const EditPage = () => {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const memeRef = useRef(null);
    const templateUrl = params.get("url");

    // Layout configuration states
    const [textLayers, setTextLayers] = useState([
        { id: 1, text: "TOP TEXT", color: "#ffffff", fontSize: 32, isImpact: true },
        { id: 2, text: "BOTTOM TEXT", color: "#ffffff", fontSize: 32, isImpact: true }
    ]);

    // Live CSS Image Filter Adjustments
    const [brightness, setBrightness] = useState(100);
    const [contrast, setContrast] = useState(100);
    const [grayscale, setGrayscale] = useState(0);
    const [blur, setBlur] = useState(0);
    const [useWatermark, setUseWatermark] = useState(false);

    const handleUpdateText = (id, newText) => {
        setTextLayers(textLayers.map(layer => layer.id === id ? { ...layer, text: newText } : layer));
    };

    const handleStyleChange = (id, property, value) => {
        setTextLayers(textLayers.map(layer => layer.id === id ? { ...layer, [property]: value } : layer));
    };

    const addNewTextLayer = () => {
        setTextLayers([...textLayers, {
            id: Date.now(),
            text: `NEW LAYER`,
            color: "#ffff00",
            fontSize: 26,
            isImpact: true
        }]);
    };

    const deleteTextLayer = (id) => {
        setTextLayers(textLayers.filter(layer => layer.id !== id));
    };

    const exportMeme = async () => {
        if (!memeRef.current) return;
        try {
            const dataUrl = await toJpeg(memeRef.current, { quality: 0.98, skipFonts: false });
            const link = document.createElement("a");
            link.download = `memeforge-${Date.now()}.jpeg`;
            link.href = dataUrl;
            link.click();
        } catch (error) {
            console.error("Export failed:", error);
        }
    };

    const saveAsDraft = () => {
        const success = saveMemeToLocal(templateUrl, textLayers);
        if (success) alert("Meme layout configuration saved to Local History!");
    };

    return (
        <div className="workspace-container py-5">
            <Container>
                <Button variant="outline-light" className="mb-4 px-4" onClick={() => navigate('/')}>
                    ← Back to Gallery
                </Button>
                
                <Row className="gap-4 gap-lg-0">
                    <Col lg={7} className="d-flex justify-content-center align-items-start">
                        <div className="canvas-panel w-100">
                            <div ref={memeRef} className="meme-render-zone">
                                <img 
                                    src={templateUrl} 
                                    alt="Meme Base" 
                                    crossOrigin="anonymous" 
                                    style={{
                                        filter: `brightness(${brightness}%) contrast(${contrast}%) grayscale(${grayscale}%) blur(${blur}px)`
                                    }}
                                />
                                {textLayers.map((layer) => (
                                    <Text 
                                        key={layer.id} id={layer.id} text={layer.text}
                                        color={layer.color} fontSize={layer.fontSize} isImpact={layer.isImpact}
                                        onUpdateText={handleUpdateText}
                                    />
                                ))}
                                {useWatermark && (
                                    <div style={{
                                        position: 'absolute', bottom: '8px', right: '12px',
                                        color: 'rgba(255,255,255,0.45)', fontSize: '11px',
                                        fontFamily: 'sans-serif', pointerEvents: 'none',
                                        textShadow: '1px 1px 2px rgba(0,0,0,0.6)', fontWeight: 'bold'
                                    }}>
                                        🚀 MemeForge Pro
                                    </div>
                                )}
                            </div>
                        </div>
                    </Col>

                    <Col lg={5}>
                        <div className="control-panel">
                            <h4 className="mb-4 text-info d-flex justify-content-between align-items-center">
                                <span>🛠️ Studio Studio Dashboard</span>
                                <Button size="sm" variant="outline-info" onClick={addNewTextLayer}>+ Add Text</Button>
                            </h4>

                            {/* Section A: Text Layers Manipulation */}
                            <h6 className="text-muted text-uppercase small tracking-wider mb-3">Text Layers</h6>
                            <div className="text-layers-list d-flex flex-column gap-3 mb-4" style={{ maxHeight: '240px', overflowY: 'auto' }}>
                                {textLayers.map((layer, index) => (
                                    <div key={layer.id} className="text-layer-row">
                                        <Form.Group className="mb-2 d-flex gap-2 align-items-center">
                                            <span className="badge bg-secondary">#{index + 1}</span>
                                            <Form.Control 
                                                size="sm" type="text" value={layer.text} 
                                                onChange={(e) => handleUpdateText(layer.id, e.target.value)} 
                                            />
                                            <Button size="sm" variant="outline-danger" onClick={() => deleteTextLayer(layer.id)}>✕</Button>
                                        </Form.Group>
                                        <div className="d-flex gap-3 align-items-center justify-content-between">
                                            <Form.Control 
                                                type="color" size="sm" value={layer.color} 
                                                style={{ width: '45px', height: '28px', padding: '2px' }}
                                                onChange={(e) => handleStyleChange(layer.id, 'color', e.target.value)} 
                                            />
                                            <div className="d-flex align-items-center gap-1">
                                                <span style={{ fontSize: '11px', color: '#a0aec0' }}>Size:</span>
                                                <Form.Range 
                                                    min={14} max={64} value={layer.fontSize}
                                                    onChange={(e) => handleStyleChange(layer.id, 'fontSize', parseInt(e.target.value))}
                                                />
                                            </div>
                                            <Form.Check 
                                                type="switch" label="Impact" id={`impact-${layer.id}`} checked={layer.isImpact}
                                                onChange={(e) => handleStyleChange(layer.id, 'isImpact', e.target.checked)}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Section B: New FX Graphics Filters */}
                            <h6 className="text-muted text-uppercase small tracking-wider mb-3">FX Controls &amp; Overlays</h6>
                            <div className="bg-dark border border-secondary rounded p-3 mb-4 space-y-2">
                                <Row className="align-items-center mb-2">
                                    <Col xs={4} className="small text-muted">Brightness:</Col>
                                    <Col xs={8}><Form.Range min={50} max={150} value={brightness} onChange={(e) => setBrightness(e.target.value)} /></Col>
                                </Row>
                                <Row className="align-items-center mb-2">
                                    <Col xs={4} className="small text-muted">Contrast:</Col>
                                    <Col xs={8}><Form.Range min={50} max={200} value={contrast} onChange={(e) => setContrast(e.target.value)} /></Col>
                                </Row>
                                <Row className="align-items-center mb-2">
                                    <Col xs={4} className="small text-muted">Grayscale:</Col>
                                    <Col xs={8}><Form.Range min={0} max={100} value={grayscale} onChange={(e) => setGrayscale(e.target.value)} /></Col>
                                </Row>
                                <Row className="align-items-center mb-3">
                                    <Col xs={4} className="small text-muted">Blur FX:</Col>
                                    <Col xs={8}><Form.Range min={0} max={8} value={blur} onChange={(e) => setBlur(e.target.value)} /></Col>
                                </Row>
                                <hr className="border-secondary my-2" />
                                <Form.Check 
                                    type="checkbox" id="watermark-toggle" label="Apply Protection Watermark"
                                    className="small text-info mt-1" checked={useWatermark}
                                    onChange={(e) => setUseWatermark(e.target.checked)}
                                />
                            </div>

                            <div className="d-flex flex-column gap-2">
                                <Button variant="success" size="lg" className="fw-bold py-2" onClick={exportMeme}>
                                    💾 Download Rendered Image
                                </Button>
                                <Button variant="outline-secondary" className="py-2" onClick={saveAsDraft}>
                                    📦 Bookmark Layout State
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default EditPage;