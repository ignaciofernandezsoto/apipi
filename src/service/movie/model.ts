interface Movies {
    movies: Movie[],
    total: number,
    limit: number,
    page: number
}

interface Movie extends MinimalMovieData {
    description: string,
    displayImageUrl: string,
    year: number,
    rating: number,
    hasSubs: boolean,
}

interface MinimalMovieData {
    yifyId: number,
    imdbId: string,
    title: string,
    torrentHash: string,
}

interface ErrorResult {
    message: string
}

interface MovieServiceResponse<T> {
    success: boolean,
    data: T
}