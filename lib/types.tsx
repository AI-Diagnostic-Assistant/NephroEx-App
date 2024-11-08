import {signInFormSchema} from "@/lib/schemas";
import {z} from "zod";

export type SignInFormValues = z.infer<typeof signInFormSchema>

export type CompositeImage = {
    id: number
    createdAt: string
    imageUrl: string

}


export type Analysis = {
    id: number
    createdAt: string
    confidenceId: number
    userId: number
    ckdStagePrediction: number

}
