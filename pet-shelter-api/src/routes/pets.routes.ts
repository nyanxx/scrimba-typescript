import express from "express"
import type { Router, Response } from "express"

import { getPetByID, getPets } from "../controllers/pets.controllers"
export const petRouter: Router = express.Router()

petRouter.get("/", getPets)
petRouter.get("/:id", getPetByID)