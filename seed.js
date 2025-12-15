require("dotenv").config()
const { createClient } = require("@supabase/supabase-js")
const peopleData = require("./testData")

const supabase = createClient(
    process.env.DATABASE_URL,
    process.env.DATABASE_KEY
)

async function seed() {
    const { data, error } = await supabase.from("people2").insert(peopleData)

    if (error) {
        console.error("Error seeding database!", error)
    } else {
        console.log("Database seeded sucessfully!")
    }
}

seed()