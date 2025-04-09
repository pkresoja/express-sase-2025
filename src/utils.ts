import type { Response } from "express";

export function sendError(res: Response, e: any) {
    res.status(500).json({
        message: e.message ?? 'An error occured',
        timestamp: new Date()
    })
}