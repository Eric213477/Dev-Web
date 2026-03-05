module.exports = async (req, res) => {
    const { uid } = req.query;

    if (!uid) {
        return res.status(400).json({ success: false, error: "Mila UID!" });
    }

    try {
        // Mampiasa ilay API hitantsika tao amin'ny SYNAX
        const response = await fetch(`https://ffname.vercel.app/?uid=${uid}`);
        
        if (!response.ok) {
            throw new Error('API Error');
        }

        const data = await response.json();

        // Raha mahita anarana ilay API (Nickname no fampiasany araka ny PHP)
        if (data && data.nickname) {
            return res.status(200).json({
                success: true,
                nickname: data.nickname,
                region: data.region,
                server: data.join
            });
        } else {
            return res.status(404).json({
                success: false,
                error: "UID tsy hita amin'io API io."
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Server Error: Tsy mandeha ilay API tetezana."
        });
    }
};
                
