import express from 'express'
import type {Express, Request, Response} from 'express'
import cors from 'cors'

import  { petRouter }  from "./routes/petsRoutes.js"
import type { Router } from "express"

const PORT = 3000
const app:Express = express()

app.use(cors())

app.use("/", petRouter)

app.use((_req:Request, res:Response<{message:string}>):void=>{
  res.status(404).json({message: "No endpoint found"})
})

app.listen(PORT, ():void =>{
  console.log("Listening on port: ", PORT)
})