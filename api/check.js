module.exports = async (req, res) => {
    const { uid } = req.query;
    if (!uid) return res.status(400).json({ success: false, error: "Mila UID!" });

    try {
        // Ny robot-nao dia manao "POST request" any amin'ny API an'ny Click-Diams
        const response = await fetch("https://click-diams.vercel.app/api/validate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/122.0.0.0",
                "Referer": "https://click-diams.vercel.app/",
                "Origin": "https://click-diams.vercel.app"
            },
            body: JSON.stringify({
                "uid": uid,
                "game": "freefire"
            })
        });

        const data = await response.json();

        // Raha mahita ny anarana ao amin'ny Click-Diams ny robot
        if (data && (data.nickname || data.username || data.name)) {
            return res.status(200).json({
                success: true,
                nickname: data.nickname || data.username || data.name
            });
        } else {
            // Backup: Raha tsy mamaly ny Click-Diams, manandrana ny API iraisam-pirenena
            const backup = await fetch(`https://freefire-api-six.vercel.app/api/v1/info?id=${uid}`);
            const backupData = await backup.json();
            
            if (backupData && backupData.nickname) {
                return res.status(200).json({ success: true, nickname: backupData.nickname });
            }

            return res.status(404).json({
                success: false,
                error: "Tsy nahazo valiny avy amin'ny Click-Diams."
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Server Error: Tsy afaka nifandray tamin'ny tetezana."
        });
    }
};
