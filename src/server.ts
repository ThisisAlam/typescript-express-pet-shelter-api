import express, {Request, Response} from 'express'
import type {Express} from 'express'

const PORT = 3000
const app:Express = express()
app.use(express.json())

app.get("/", (_req:Request,res:Response):void=>{
  res.json({
    message: "Pet Shelter API"
  })
})

app.listen(PORT, ():void =>{
 console.log(`Listening on port: ${PORT}`)
})