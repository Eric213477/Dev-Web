module.exports = async (req, res) => {
    const { uid } = req.query;

    if (!uid) return res.status(400).json({ error: "Mila UID!" });

    try {
        // Mampiasa fetch (Native Node.js) fa tsy axios intsony
        const response = await fetch('https://www.kashishop.com/api/v1/game/validate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "game_id": "freefire", "user_id": uid })
        });

        const data = await response.json();

        if (data && data.data && data.data.username) {
            return res.status(200).json({ success: true, nickname: data.data.username });
        } else {
            return res.status(404).json({ success: false, error: "UID tsy hita." });
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: "Server Error" });
    }
};
