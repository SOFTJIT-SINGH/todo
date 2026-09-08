import { z } from "zod";

export const registerschema = z.object({
username : z.string().trim().min(3),
email : z.email().min(3),
password : z.string().min(3,"atleast 3 char"),
phone : z.number().min(10)
})

export const loginschema = z.object({
    email  :z.email().min(3),
    password : z.string().trim().min(3)
})