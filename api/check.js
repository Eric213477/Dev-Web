const axios = require('axios');

module.exports = async (req, res) => {
    const { uid } = req.query;

    if (!uid) {
        return res.status(400).json({ error: "Mila UID azafady!" });
    }

    try {
        // Mampiasa ny API an'ny Unipin (izay manohana server maro ao anatin'izany ny MENA)
        // Ny 'app_id' sy 'token' eto dia ohatra amin'ny fomba fiasan'ny API-n'izy ireo
        const response = await axios.post('https://www.unipin.com/th/services/get-player-name', 
        `platform=free_fire&user_id=${uid}`, 
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Referer': 'https://www.unipin.com/th/free-fire'
            }
        });

        // Ny Unipin dia mamerina anarana na dia any amin'ny server MENA aza indraindray
        if (response.data && response.data.nickname) {
            return res.status(200).json({
                success: true,
                nickname: response.data.nickname
            });
        } else {
            // Raha tsy mandeha ny Unipin, ity misy fomba faharoa (Alternative API)
            // Misy API hafa antsoina hoe 'Smile.one' izay matanjaka amin'ny MENA
            const smileRes = await axios.post('https://www.smile.one/th/services/getrole', 
            `game=freefire&uid=${uid}`, 
            {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });

            if (smileRes.data && smileRes.data.username) {
                return res.status(200).json({
                    success: true,
                    nickname: smileRes.data.username
                });
            }

            return res.status(404).json({ error: "Tsy hita ilay UID" });
        }

    } catch (error) {
        return res.status(500).json({ error: "Nisy olana teknika. Andramo indray." });
    }
};
