module.exports = async (req, res) => {
    // Alaina ny UID avy amin'ny URL (?uid=...)
    const { uid } = req.query;

    if (!uid) {
        return res.status(400).json({ success: false, error: "Mila UID!" });
    }

    try {
        // Mampiasa fetch (native) fa tsy axios
        const response = await fetch('https://www.kashishop.com/api/v1/game/validate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0'
            },
            body: JSON.stringify({
                "game_id": "freefire",
                "user_id": uid
            })
        });

        const data = await response.json();

        // Raha mahazo valiny amin'ilay anarana
        if (data && data.data && data.data.username) {
            return res.status(200).json({
                success: true,
                nickname: data.data.username
            });
        } else {
            return res.status(404).json({
                success: false,
                error: "UID tsy hita ao amin'ny server MENA."
            });
        }

    } catch (error) {
        // Raha misy olana hafa
        return res.status(500).json({
            success: false,
            error: "Server Error: Misy olana ny fifandraisana."
        });
    }
};
