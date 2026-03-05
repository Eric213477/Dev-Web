module.exports = async (req, res) => {
    const { uid } = req.query;
    if (!uid) return res.status(400).json({ success: false, error: "Mila UID!" });

    try {
        // Ny robot-nao dia manontany ny API an'ny Click-Diams
        // Ampiasaina ny rafitra validate an'ny Firebase ampiasainy
        const response = await fetch("https://click-diams.vercel.app/api/validate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/122.0.0.0",
                "Referer": "https://click-diams.vercel.app/"
            },
            body: JSON.stringify({
                "uid": uid,
                "game": "freefire"
            })
        });

        // Raha tsy mandeha mivantana ny /api/validate, 
        // dia mampiasa ny fomba fiasa faharoa (Internal Firebase)
        const data = await response.json();

        if (data && (data.nickname || data.username)) {
            return res.status(200).json({
                success: true,
                nickname: data.nickname || data.username
            });
        } else {
            return res.status(404).json({
                success: false,
                error: "Tsy afaka naka anarana tao amin'ny Click-Diams."
            });
        }
    } catch (error) {
        // Raha sendra misy sakana ny Click-Diams, dia miverina amin'ny Smile.one
        try {
            const backup = await fetch("https://www.smile.one/api/v1/game/validate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ "game": "freefire", "uid": uid })
            });
            const backupData = await backup.json();
            if (backupData.username) {
                return res.status(200).json({ success: true, nickname: backupData.username });
            }
        } catch (e) {}

        return res.status(500).json({
            success: false,
            error: "Server Error: Tsy afaka nifandray tamin'ny tetezana."
        });
    }
};
