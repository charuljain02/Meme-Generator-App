const STORAGE_KEY = 'local_meme_drafts';

export const saveMemeToLocal = (templateUrl, textLayers) => {
    try {
        const existing = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        const newDraft = {
            id: Date.now(),
            templateUrl,
            textLayers,
            savedAt: new Date().toLocaleDateString()
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify([newDraft, ...existing]));
        return true;
    } catch (e) {
        console.error("Error saving draft:", e);
        return false;
    }
};

export const getLocalMemes = () => {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (e) {
        return [];
    }
};