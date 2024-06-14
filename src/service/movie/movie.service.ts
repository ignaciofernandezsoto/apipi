import {YifyConnector} from "../../connector/yify/yify.connector";
import {OrderDto, QualityDto, SortDto} from "../../connector/yify/dto";

export class MovieService {
    constructor(private readonly yifyConnector: YifyConnector) {}

    async getMovies(query: string): Promise<MovieServiceResponse<Movies | ErrorResult>> {
        const yifyMoviesResult = await this.yifyConnector.getMovies({
            query_term: query,
            quality: QualityDto.TEN_EIGHTY_P,
            sort_by: SortDto.DOWNLOAD_COUNT,
            order_by: OrderDto.DESC
        })

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
                movies: (yifyMoviesResult.data.movies || [])
                    .map(
                        movieDto => ({
                            yifyId: movieDto.id,
                            title: movieDto.title,
                            description: movieDto.description_full,
                            displayImageUrl: movieDto.medium_cover_image,
                            year: movieDto.year,
                            rating: movieDto.rating,
                            torrentHash: movieDto.torrents.find(t => t.quality == QualityDto.TEN_EIGHTY_P)!.hash,
                            hasSubs: false
                        })
                    )
            }
        }

    }
}