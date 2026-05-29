export const getAllMemes = async () => {
    try {
        const response = await fetch("https://api.imgflip.com/get_memes");
        if (!response.ok) throw new Error("Network response was not ok");
        return await response.json();
    } catch (error) {
        console.error("Error fetching meme templates:", error);
        return { data: { memes: [] } };
    }
};