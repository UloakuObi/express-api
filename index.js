// Load environment variables from .env file
require('dotenv').config();

const express = require("express")
const { createClient } = require('@supabase/supabase-js');
const cors = require("cors")

const app = express()
const port = process.env.PORT || 3000;

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

app.use(cors({
    origin: '*', // for testing only; in production, restrict to your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }))


app.use(express.json())

// Routes

// Test Route
app.get("/ping", (req, res) => res.send("pong"));

// Get data from db
app.get("/people2", async(req, res) => {
    const {data, error} = await supabase.from("people2").select("*")

    if (error) {
        console.error(error)
        return res.status(500).json({ error: "Failed to fetch data" })
    }

    res.json(data)
})
  
// Add or Post data to db
app.post("/people2", async (req, res) => {

    console.log(req.body)

    const {name, job, isRich} = req.body

    if (!name || !job || isRich === undefined) {
        return res.status(500).json({Error: "Missing fields"})
    }

    const { data, error } = await supabase
        .from("people2")
        .insert([{name, job, isRich}])
    
    if (error) {
        console.error(error)
        return res.status(500).json({Error: "Failed to post data"})
    }

    res.status(201).json({ message: "Data successfully posted" });
})


// Listening to port
app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})




