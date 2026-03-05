module.exports = async (req, res) => {
    const { uid } = req.query;
    if (!uid) return res.status(400).json({ success: false, error: "Mila UID!" });

    try {
        // Miantso ny API an'ny MTCGAME (izay mampiasa server Garena MENA)
        const response = await fetch("https://www.mtcgame.com/api/v1/game/validate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0"
            },
            body: JSON.stringify({
                "gameId": "free-fire",
                "userId": uid
            })
        });

        const data = await response.json();

        // Raha mahita ny anarana ny robot
        if (data && data.nickname) {
            return res.status(200).json({
                success: true,
                nickname: data.nickname
            });
        } 
        
        // Raha tsy hita (Alternative: Smile.one)
        const altRes = await fetch("https://www.smile.one/api/v1/game/validate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "game": "freefire", "uid": uid })
        });
        const altData = await altRes.json();

        if (altData && altData.username) {
            return res.status(200).json({ success: true, nickname: altData.username });
        }

        return res.status(404).json({ success: false, error: "Tsy hita ao amin'ny server MENA io UID io." });

    } catch (error) {
        return res.status(500).json({ success: false, error: "Nisy olana teknika. Andramo indray." });
    }
};
