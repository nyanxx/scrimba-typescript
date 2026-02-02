import express from "express"
import type { Express, Request, Response, NextFunction } from "express"
import cors from "cors"
import { petRouter } from "./routes/pets.routes"

const app: Express = express()
const PORT = 8000

app.use(cors())
app.use("/pets", petRouter)

app.use((req: Request, res: Response<{ status: number, message: string }>, next: NextFunction): void => {
    res.status(404).json({ status: 404, message: "No endpoint found!" })
})

app.listen(PORT, (): void => {
    console.log(`http://localhost:${PORT}`)
})