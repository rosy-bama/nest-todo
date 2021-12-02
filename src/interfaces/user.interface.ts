import { DateSchema } from "joi";

export interface User {
    publicId: string,
    firstName: string,
    lastName: string,
    email: string,
    password?: string,
    created_at: Date,
    updated_at: Date
}