import express from "express"
import type { Router } from "express"
import { getPetByID, getPets } from "../controllers/pets.controllers"
import {
    // pleaseAuth,
    validateNumericID
} from "../middlewares/pets.middleware"
export const petRouter: Router = express.Router()

petRouter.get("/", getPets)

petRouter.get(
    "/:id",
    // pleaseAuth,
    validateNumericID,
    getPetByID
)