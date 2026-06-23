import express from 'express'
import type { Express, Request, Response } from 'express'
import { pets } from "./data/pets.ts"
import type { Pet } from "./data/pets.ts"
import cors from "cors"

const PORT = 3000
const app: Express = express()

app.use(cors())
app.use(express.json())

/*
CHALLENGE: Filter the pets by incoming species query and respond with the filtered list
1. Grab the `species` query parameter
2. Create a variable (and type it) to house filtered pets
3. Filter the pets by said parameter (and type the callback)
(Make sure the strings you're comparing are lowercase!)
4. Send filtered data back via `res.json()`

Example API call: http://localhost:8000/&species=cat

Don't worry about any additional TypeScript yet.
You'll get an error if you try to run this. Don't worry, we'll handle it soon!
*/



app.get('/', (req: Request, res: Response<Pet[] | { message: string }>): void => {
    const species = req.query.species

    // No query => return all pets
    if (typeof species !== 'string') {
        res.json(pets)
        return
    }

    const filteredPets: Pet[] = pets.filter((pet: Pet): boolean => {
        return pet.species.toLowerCase() === species.toLowerCase()
    })

    if (filteredPets.length === 0) {
        res.status(404).json({
            message: 'Filtered Pet not found'
        })
        return
    }

    res.json(filteredPets)
})


app.get('/:id', (req: Request<{ id: string }>, res: Response<Pet | { message: string }>): void => {
    //what now?
    const { id } = req.params
    const singlePet: Pet | undefined = pets.find((pet: Pet): boolean => {
        return pet.id.toString() === id;
    })
    if (!singlePet) {
        res.status(404).json({
            message: 'Pet not found'
        })
        return
    }
    res.json(singlePet)
})
app.use((_req: Request, res: Response): void => {
    res.status(404).json({ message: "Endpoint not found" })
})
app.listen(PORT, (): void => {
    console.log("Listening on port: ", PORT)
})