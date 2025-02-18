const path = require("path");

exports.fileUpload = async (req, res) => {
    try {
        const file = req.files.file;
        const filename = Date.now() + '-' + file.name; // Adding a timestamp to avoid duplicate filenames
        const uploadpath = path.join(__dirname, "../uploads/" + filename);

        file.mv(uploadpath, (err) => {
            if (err) {
                console.error("File upload error:", err);
                return res.status(500).json({ error: "File upload failed" });
            }
            res.json({ path: "uploads/" + filename });
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};