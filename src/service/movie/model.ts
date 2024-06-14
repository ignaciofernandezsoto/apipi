interface Movies {
    movies: Movie[]
}

interface Movie {
    yifyId: number,
    title: string,
    description: string,
    displayImageUrl: string
    year: number,
    rating: number,
    torrentHash: string
    hasSubs: boolean
}

interface ErrorResult {
    message: string
}

interface MovieServiceResponse<T> {
    success: boolean,
    data: T
}