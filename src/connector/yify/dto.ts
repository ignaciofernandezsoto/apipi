type URL = string

export enum QualityDto {
    ALL = 'All',
    SEVEN_TWENTY_P = '720p',
    TEN_EIGHTY_P = '1080p',
    THREE_D = '3D',
}

export enum SortDto {
    TITLE = 'title',
    YEAR = 'year',
    RATING = 'rating',
    PEERS = 'peers',
    SEEDS = 'seeds',
    DOWNLOAD_COUNT = 'download_count',
    LIKE_COUNT = 'like_count',
    DATE_ADDED = 'date_added',
}

export enum OrderDto {
    ASC = 'asc',
    DESC = 'desc',
}

/**
 * Used to list and search through out all the available movies. Can sort, filter, search and order the results
 */
export interface MoviesPayloadDto {
    /**
     * The limit of results per page that has been set
     * @defaultValue 20
     * @maximum 50
     * @minimum 1
     */
    limit?: number
    /**
     * Used to see the next page of movies, eg limit=15 and page=2 will show you movies 15-30
     * @defaultValue 1
     * @minimum 1
     */
    page?: number
    /**
     * Used to filter by a given quality
     * @defaultValue All
     */
    quality?: QualityDto
    /**
     * Used to filter movie by a given minimum IMDb rating
     * @defaultValue 0
     * @minimum 0
     * @maximum 9
     */
    minimum_rating?: number
    /**
     * Used for movie search, matching on: Movie Title/IMDb Code, Actor Name/IMDb Code, Director Name/IMDb Code
     */
    query_term?: string
    /**
     * Used to filter by a given genre
     * @see http://www.imdb.com/genre/
     * @defaultValue All
     */
    genre?: string
    /**
     * Sorts the results by choosen value
     * @defaultValue date_added
     */
    sort_by?: SortDto
    /**
     * Orders the results by either Ascending or Descending order
     * @defaulValue desc
     */
    order_by?: OrderDto
    /**
     * Returns the list with the Rotten Tomatoes rating included
     * @defaultValue false
     */
    with_rt_ratings?: boolean
}

/**
 * Returns 4 related movies as suggestions for the user
 */
export interface MovieSuggestionsPayloadDto {
    /**
     * The ID of the movie
     * @defaultValue null
     */
    movie_id: number
}

/**
 * Returns the information about a specific movie
 */
export interface MoviePayloadDto extends MovieSuggestionsPayloadDto {
    /**
     * When set the data returned will include the added image URLs
     * @defaultValue false
     */
    with_images?: boolean
    /**
     * When set the data returned will include the added information about the cast
     * @defaultValue false
     */
    with_cast?: boolean
}

export interface TorrentDto {
    readonly url: URL
    readonly hash: string
    readonly quality: QualityDto
    readonly type?: string
    readonly seeds: number
    readonly peers: number
    readonly size: string
    readonly size_bytes: number
    readonly date_uploaded: string
    readonly date_uploaded_unix: number
}

export interface MetaDto {
    readonly server_time: number
    readonly server_timezone: string
    readonly api_version: number
    readonly execution_time: string
}

export interface MovieDto {
    readonly id: number
    readonly url: URL
    readonly imdb_code: string
    readonly title: string
    readonly title_english: string
    readonly title_long: string
    readonly slug: string
    readonly year: number
    readonly rating: number
    readonly runtime: number
    readonly genres: ReadonlyArray<string>
    readonly download_count?: number
    readonly like_count?: number
    readonly summary?: string
    readonly description_intro?: string
    readonly description_full: string
    readonly synopsis?: string
    readonly yt_trailer_code: string
    readonly language: string
    readonly mpa_rating: string
    readonly background_image: URL
    readonly background_image_original: URL
    readonly small_cover_image: URL
    readonly medium_cover_image: URL
    readonly large_cover_image?: URL
    readonly state?: string
    readonly torrents: ReadonlyArray<TorrentDto>
    readonly date_uploaded: string
    readonly date_uploaded_unix: number
}

export interface MoviesResponseDto {
    /**
     * The total movie count results for your query
     */
    readonly movie_count: number
    /**
     * The limit of results per page that has been set
     */
    readonly limit?: number
    /**
     * The current page number you are viewing
     */
    readonly page_number?: number
    /**
     * An array which will hold multiple movies and their relative information
     */
    readonly movies: ReadonlyArray<MovieDto>
}

export interface MovieResponseDto {
    /**
     * Relative information about the movie
     */
    readonly movie: MovieDto
}

/**
 * All the API endpoints return the same data structure
 */
export interface YifyResponseDto<T> {
    /**
     * The returned status for the API call
     * @example 'ok'
     */
    readonly status: 'ok' | 'error'
    /**
     * Either the error message or the successful message
     * @example Query was successful
     */
    readonly status_message: string
    /**
     * If 'status' is returned as 'ok' the API query results will be inside 'data'
     */
    readonly data: T
    readonly '@meta': MetaDto
}