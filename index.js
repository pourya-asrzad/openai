const express = require("express")
const morgan = require("morgan")
const app = express()
const cors = require('cors')
const { default: OpenAI } = require("openai")

const openai = new OpenAI({
    organization: "org-Y0HTn2Zg79Ow9rdlj8ZcQ7Rq",
    apiKey: "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",
})

app.use(morgan("tiny"))
app.use(cors())


app.post("/imagegenerator", async (req, res) => {


    const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: "a white siamese cat",
        n: 1,
        size: "1024x1024",
    });



    if (response.created) {

        return res.json(response)
    }


})


const port = process.env.PORT | 3000
app.listen(port, () => {
    console.log("http://localhost:3000")
})