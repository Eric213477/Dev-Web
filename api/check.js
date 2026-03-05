module.exports = async (req, res) => {
    const { uid } = req.query;
    if (!uid) return res.status(400).json({ success: false, error: "Mila UID!" });

    try {
        // Robot mampiasa Bridge API (izay mahita ny MENA server)
        const response = await fetch(`https://free-fire-api-six.vercel.app/api/v1/info?id=${uid}`);
        
        if (!response.ok) throw new Error('Network error');

        const data = await response.json();

        // Raha mahita ny anarana ꧁ŁɆ₣Ø₦₲꧂ ny robot
        if (data && data.nickname) {
            return res.status(200).json({
                success: true,
                nickname: data.nickname
            });
        } else {
            return res.status(404).json({
                success: false,
                error: "Tsy hita ao amin'ny server MENA io UID io."
            });
        }
    } catch (error) {
        // Raha misy olana ny Bridge dia manandrana fomba faharoa (Backup)
        return res.status(500).json({
            success: false,
            error: "Mbola misy sakana ny Garena. Andramo indray rehefa afaka kelikely."
        });
    }
};
