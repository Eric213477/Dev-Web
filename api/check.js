module.exports = async (req, res) => {
    const { uid } = req.query;

    if (!uid) {
        return res.status(400).json({ success: false, error: "Mila UID!" });
    }

    try {
        // Robot automatique miditra ao amin'ny Shop2Game MENA
        const response = await fetch('https://shop2game.com/api/auth/player_id_login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'
            },
            body: JSON.stringify({
                "app_id": 100067,
                "login_id": uid,
                "app_server_id": 0
            })
        });

        const data = await response.json();

        // Raha mahomby dia mivoaka ny nickname
        if (data && data.nickname) {
            return res.status(200).json({
                success: true,
                nickname: data.nickname
            });
        } else {
            // Ity no niseho teo amin'ny sarinao taloha (cite: 1000256993.jpg)
            return res.status(404).json({
                success: false, 
                error: "UID tsy hita ao amin'ny Shop2Game MENA."
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Server Error: Misy olana ny fifandraisana."
        });
    }
};
