import { z } from 'zod';

export const todoshema = z.object({
    title : z.string().min(2, "atleast 2 char for title"),
    desc : z.string().min(2, "atleast 2 char for desc"),
})

export const updatetodoschema = todoshema.partial()