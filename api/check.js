module.exports = async (req, res) => {
    const { uid } = req.query;
    if (!uid) return res.status(400).json({ success: false, error: "Mila UID!" });

    try {
        // 1. Manandrana ny Shop2Game (Garena ofisialy)
        const garenaRes = await fetch('https://shop2game.com/api/auth/player_id_login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0' },
            body: JSON.stringify({ "app_id": 100067, "login_id": uid, "app_server_id": 0 })
        });
        const garenaData = await garenaRes.json();

        if (garenaData && garenaData.nickname) {
            return res.status(200).json({ success: true, nickname: garenaData.nickname });
        }

        // 2. Raha tsy hita ao, manandrana ny API iraisam-pirenena (Custom Proxy)
        const altRes = await fetch(`https://freefire-api.vercel.app/api/v1/info?id=${uid}`);
        const altData = await altRes.json();

        if (altData && altData.nickname) {
            return res.status(200).json({ success: true, nickname: altData.nickname });
        }

        return res.status(404).json({ success: false, error: "UID tsy hita na diso server." });

    } catch (error) {
        return res.status(500).json({ success: false, error: "Nisy olana ny fifandraisana." });
    }
};
