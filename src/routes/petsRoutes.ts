import express from 'express'
import type {Router} from 'express'

import {getPets, getPetById} from "../controllers/petsController.ts"

import {validateNumericId, pleaseAuth} from '../middleware/petsMiddleware.ts'

export const petRouter:Router = express.Router()



petRouter.get('/', getPets)

petRouter.get('/:id', pleaseAuth, validateNumericId, getPetById)
