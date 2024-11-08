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
