const axios = require('axios');

module.exports = async (req, res) => {
    const { uid } = req.query;

    if (!uid) {
        return res.status(400).json({ error: "Mila UID azafady!" });
    }

    try {
        // Mampiasa ny API an'ny Kashishop (Tena mandeha amin'ny MENA)
        const response = await axios.post('https://www.kashishop.com/api/v1/game/validate', {
            "game_id": "freefire",
            "user_id": uid
        }, {
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36'
            }
        });

        if (response.data && response.data.data && response.data.data.username) {
            return res.status(200).json({
                success: true,
                nickname: response.data.data.username
            });
        } else {
            return res.status(404).json({ success: false, error: "UID tsy hita." });
        }

    } catch (error) {
        // Raha misy error dia aseho eto ny antony (Debugging)
        console.error(error);
        return res.status(500).json({ 
            success: false, 
            error: "Server Error: Hamarino raha efa nanao 'npm install axios' ianao." 
        });
    }
};
