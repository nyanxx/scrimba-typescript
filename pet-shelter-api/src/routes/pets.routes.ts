import express from "express"
import type { Router, Request, Response } from "express"
import { pets } from "../data/pets"
import { Pet } from "../data/pets"

export const petRouter: Router = express.Router()

type ResponseBody = Pet[] | { message: string }
type RequestQuery = {
    species?: string,
    adopted?: "true" | "false",
    minAge?: string,
    maxAge?: string,
}

petRouter.get("/", (req: Request<{}, unknown, {}, RequestQuery>, res: Response<ResponseBody>): void => {

    const { adopted, species, minAge, maxAge } = req.query

    let filteredPets: Pet[] = pets

    if (species) {
        filteredPets = filteredPets.filter((pet: Pet): boolean => pet.species.toLowerCase() === species)
    }

    // This will not considered ?adopted=FalsE (if want that capability maybe use .toLowerCase() on adopted first)
    if (adopted) {
        const isAdopted: boolean | undefined = (adopted === "true") ? true : (adopted === "false") ? false : undefined
        if (typeof isAdopted === "boolean") {
            filteredPets = (filteredPets.filter((pet: Pet): boolean => (isAdopted) ? pet.adopted : !pet.adopted))
        }
    }

    if (minAge) {
        filteredPets = filteredPets.filter((pet: Pet): boolean => pet.age >= +minAge)
    }

    if (maxAge) {
        // Any comparison like pet.age with NaN will always be false. And then here the filteredPets will become empty array
        filteredPets = filteredPets.filter((pet: Pet): boolean => pet.age <= +maxAge)
    }

    if (filteredPets.length > 0) {
        res.json(filteredPets)
    } else {
        res.status(404).json({ message: `no data found!` })
    }
})

type RequestParam = { id: string }
petRouter.get("/:id", (req: Request<RequestParam>, res: Response<Pet | { message: "Not Found" }>): void => {
    const { id } = req.params
    const pet: Pet | undefined = pets.find((obj: Pet): boolean => obj.id === +id)
    if (pet) {
        res.json(pet)
    } else {
        res.status(404).json({ message: "Not Found" })
    }
})
