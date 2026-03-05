module.exports = async (req, res) => {
    const { uid } = req.query;

    if (!uid) return res.status(400).json({ success: false, error: "Mila UID!" });

    try {
        // Mampiasa API iraisam-pirenena izay mahita ny server rehetra
        const response = await fetch(`https://freefire-api.vercel.app/api/v1/info?id=${uid}`);
        
        if (!response.ok) {
            throw new Error('Network error');
        }

        const data = await response.json();

        if (data && data.nickname) {
            return res.status(200).json({
                success: true,
                nickname: data.nickname,
                region: data.region || "Unknown"
            });
        } else {
            return res.status(404).json({
                success: false,
                error: "Tsy hita io UID io na aiza na aiza."
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Misy olana ny API iraisam-pirenena. Andramo indray."
        });
    }
};
