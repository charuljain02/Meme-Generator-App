import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Tabs, Tab, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import MemeCard from "../components/Card";
import { getAllMemes } from "../api/memes";
import { getLocalMemes } from "../utils/storage";
import './Home.css';

const HomePage = () => {
    const [templates, setTemplates] = useState([]);
    const [savedDrafts, setSavedDrafts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getAllMemes().then((res) => setTemplates(res?.data?.memes || []));
        setSavedDrafts(getLocalMemes());
    }, []);

    const handleLocalUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                navigate(`/edit?url=${encodeURIComponent(event.target.result)}`);
            };
            reader.readAsDataURL(file);
        }
    };

    const filteredTemplates = templates.filter(meme => 
        meme.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="home-bg py-5">
            <Container>
                <div className="text-center mb-5">
                    <h1 className="fw-bold display-4 mb-2">Forge Epic Memes</h1>
                    <p className="text-muted">Select a trending canvas base, import photos locally, or remix your history.</p>
                </div>

                <Tabs defaultActiveKey="trending" className="mb-5 border-0 justify-content-center custom-tabs nav-pills">
                    <Tab eventKey="trending" title="🔥 Active Templates">
                        {/* Custom relative wrapper to host the instant wipe utility layout button */}
                        <div className="position-relative mb-5" style={{ maxWidth: '100%' }}>
                            <Form.Control 
                                type="text" 
                                placeholder="🔍 Scan templates by keyword name..." 
                                className="search-bar-custom pr-5 shadow-sm"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{ paddingRight: '50px' }}
                            />
                            {searchQuery.length > 0 && (
                                <Button 
                                    size="sm"
                                    variant="link"
                                    onClick={() => setSearchQuery("")}
                                    style={{
                                        position: 'absolute', right: '15px', top: '50%',
                                        transform: 'translateY(-50%)', color: '#a0aec0',
                                        textDecoration: 'none', fontWeight: 'bold', fontSize: '18px',
                                        zIndex: 10, padding: 0
                                    }}
                                >
                                    ✕
                                </Button>
                            )}
                        </div>

                        <Row>
                            {filteredTemplates.length === 0 ? (
                                <div className="text-center text-muted py-4">No matching templates found.</div>
                            ) : (
                                filteredTemplates.map((meme) => (
                                    <Col key={meme.id} lg={3} md={4} sm={6} className="d-flex align-items-stretch">
                                        <MemeCard img={meme.url} title={meme.name} />
                                    </Col>
                                ))
                            )}
                        </Row>
                    </Tab>
                    
                    <Tab eventKey="upload" title="📸 Custom Upload">
                        <div className="dropzone-container text-center p-5 my-4">
                            <div className="fs-1 mb-3">🖼️</div>
                            <h5>Drag &amp; Drop Workspace Image</h5>
                            <p className="text-muted small mb-3">Supports raw formats up to 4K resolution safely entirely client-side</p>
                            <Form.Group>
                                <Form.Control 
                                    type="file" 
                                    accept="image/*" 
                                    className="d-none" 
                                    id="local-file-picker" 
                                    onChange={handleLocalUpload} 
                                />
                                <label htmlFor="local-file-picker" className="btn btn-info px-4 py-2 fw-semibold shadow-sm">
                                    Browse Native Explorer
                                </label>
                            </Form.Group>
                        </div>
                    </Tab>

                    <Tab eventKey="history" title="📦 Saved History">
                        <Row className="mt-4">
                            {savedDrafts.length === 0 ? (
                                <div className="text-center text-muted py-5">No bookmarked configurations located in local storage memory.</div>
                            ) : (
                                savedDrafts.map((draft) => (
                                    <Col key={draft.id} lg={3} md={4} sm={6}>
                                        <div className="card bg-dark border border-secondary text-white rounded p-3 mb-3" style={{ cursor: 'pointer' }} onClick={() => navigate(`/edit?url=${encodeURIComponent(draft.templateUrl)}`)}>
                                            <img src={draft.templateUrl} alt="Draft preview" style={{ height: '140px', objectFit: 'cover' }} className="rounded mb-2" />
                                            <div className="small text-info fw-bold">Saved: {draft.savedAt}</div>
                                            <div className="small text-muted">{draft.textLayers.length} Dynamic Layers</div>
                                        </div>
                                    </Col>
                                ))
                            )}
                        </Row>
                    </Tab>
                </Tabs>
            </Container>
        </div>
    );
};

export default HomePage;