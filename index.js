const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const { OpenAI } = require("openai");

const openai = new OpenAI({
    organization: "org-Y0HTn2Zg79Ow9rdlj8ZcQ7Rq",
    apiKey: "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",
});

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests

app.post("/imagegenerator", async (req, res) => {
    try {
        const { prompt, n, size } = req.body;

        if (!prompt || !n || !size) {
            return res.status(400).json({ error: "Missing required parameters" });
        }

        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt,
            n,
            size,
        });

        if (response.created) {
            return res.json(response);
        }
    } catch (error) {
        console.error("Error generating image:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

const port = process.env.PORT || 3000; // Use '||' instead of '|' for default port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
