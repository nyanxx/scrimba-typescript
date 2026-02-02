import type { Request, Response, NextFunction } from "express"

export const validateNumericID = (req: Request<{ id: string }>, res: Response<{ message: string }>, next: NextFunction): void => {
    const { id } = req.params
    if (!/^\d+$/.test(id)) {
        res.status(404).json({ message: "Pet ID must be a number" })
    } else {
        next()
    }
}

// export const pleaseAuth = (req: Request<{}, {}, {}, { password?: string }>, res: Response<{ message: string }>, next: NextFunction): void => {
//     const { password } = req.query;
//     if (password === "please") {
//         next()
//     } else {
//         res.status(401).json({ message: "You are not authorized! Say please!" });
//     }
// }