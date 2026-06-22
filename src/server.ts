import express from 'express'
import type { Express, Request, Response } from 'express'
import { pets } from "./data/pets.ts"
import type { Pet } from "./data/pets.ts"
import cors from "cors"

const PORT = 3000
const app: Express = express()

app.use(cors())
app.use(express.json())
app.get('/', (_req: Request, res: Response): void => {
    res.json(pets)
})
// app.get('/:id', (req: Request, res: Response<Pet|{message:string}>): void => {
//     //what now?
//     const paramsId: number = Number(req.params.id)
//     const singlePet: Pet | undefined = pets.find((pet): boolean => {
//         return pet.id === paramsId;
//     })
app.get('/:id', (req: Request<{id:string}>, res: Response<Pet|{message:string}>): void => {
    //what now?
    const {id} = req.params
    const singlePet: Pet | undefined = pets.find((pet:Pet): boolean => {
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