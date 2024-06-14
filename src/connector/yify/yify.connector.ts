import axios from 'axios'
import {
    MoviePayloadDto,
    MovieResponseDto,
    MoviesPayloadDto,
    MoviesResponseDto,
    MovieSuggestionsPayloadDto,
    YifyResponseDto,
} from './dto'

export class YifyConnector {
    constructor(private readonly baseUrl?: string) {}

    async getMovies(params?: MoviesPayloadDto) {
        const { data } = await axios
            .get<YifyResponseDto<MoviesResponseDto>>(
                `${this.baseUrl || 'https://yts.lt/api/v2/'}list_movies.json`,
                {
                    params,
                },
            )
            .catch(e => {
                throw new Error(e)
            })

        return data
    }

    async getMovie(params: MoviePayloadDto) {
        const { data } = await axios
            .get<YifyResponseDto<MovieResponseDto>>(
                `${this.baseUrl || 'https://yts.lt/api/v2/'}movie_details.json`,
                {
                    params,
                },
            )
            .catch(e => {
                throw new Error(e)
            })

        return data
    }

    async getSuggestions(params: MovieSuggestionsPayloadDto) {
        const { data } = await axios
            .get<YifyResponseDto<MoviesResponseDto>>(
                `${this.baseUrl || 'https://yts.lt/api/v2/'}movie_suggestions.json`,
                { params },
            )
            .catch(e => {
                throw new Error(e)
            })

        return data
    }
}