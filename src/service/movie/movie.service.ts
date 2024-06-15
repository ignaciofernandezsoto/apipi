import {YifyConnector} from "../../connector/yify/yify.connector";
import {MoviesPayloadDto, OrderDto, QualityDto, SortDto, TorrentDto} from "../../connector/yify/dto";

export class MovieService {
    constructor(private readonly yifyConnector: YifyConnector) {
    }

    async getMovies(query?: string, limit?: number, page?: number): Promise<MovieServiceResponse<Movies | ErrorResult>> {
        const payload: MoviesPayloadDto = {
            //quality: QualityDto.TEN_EIGHTY_P, Removed until YTS fixes dupe bug
            sort_by: SortDto.DOWNLOAD_COUNT,
            order_by: OrderDto.DESC
        }

        if (query)
            payload["query_term"] = query

        if (limit)
            payload["limit"] = limit

        if (page)
            payload["page"] = page

        const yifyMoviesResult = await this.yifyConnector.getMovies(payload)

        if (yifyMoviesResult.status != "ok") {
            return {
                success: false,
                data: {
                    message: yifyMoviesResult.status_message
                }
            }
        }

        return {
            success: true,
            data: {
                total: yifyMoviesResult.data.movie_count,
                limit: yifyMoviesResult.data.limit || limit || 20,
                page: yifyMoviesResult.data.page_number || page || 1,
                movies: (yifyMoviesResult.data.movies || [])
                    .map(
                        movieDto => ({
                            yifyId: movieDto.id,
                            imdbId: movieDto.imdb_code,
                            title: movieDto.title,
                            description: movieDto.description_full,
                            displayImageUrl: movieDto.large_cover_image || movieDto.medium_cover_image,
                            year: movieDto.year,
                            rating: movieDto.rating,
                            torrentHash: (movieDto.torrents.find(t => t.quality == QualityDto.TEN_EIGHTY_P) || movieDto.torrents.find(t => t.quality == QualityDto.SEVEN_TWENTY_P))!.hash,
                            hasSubs: false
                        })
                    )
            }
        }

    }

    async getMovie(yifyId: number): Promise<MovieServiceResponse<MinimalMovieData | ErrorResult>> {
        const yifyMoviesResult = await this.yifyConnector.getMovie({
            movie_id: yifyId
        })

        if (yifyMoviesResult.status != "ok") {
            return {
                success: false,
                data: {
                    message: yifyMoviesResult.status_message
                }
            }
        }

        const movieDto = yifyMoviesResult.data.movie

        return {
            success: true,
            data: {
                yifyId: movieDto.id,
                imdbId: movieDto.imdb_code,
                title: movieDto.title,
                torrentHash: this.getTorrentHash(movieDto.torrents),
            }
        }
    }

    private getTorrentHash(torrents: readonly TorrentDto[]): string {
        return (
            torrents.find(t => t.quality == QualityDto.FOUR_K) ||
            torrents.find(t => t.quality == QualityDto.TEN_EIGHTY_P) ||
            torrents.find(t => t.quality == QualityDto.SEVEN_TWENTY_P)
        )!.hash
    }

}