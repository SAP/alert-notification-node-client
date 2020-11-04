export interface PageMetadata {
    /**
     * Current page.
     */
    page: number;
    /**
     * Shows how much entities are present per page.
     */
    pageSize: number;
    /**
     * Total number of pages for the given page size.
     */
    totalPages: number;
    /**
     * Total results entities accross all pages.
     */
    totalResultsCount: number;
}

export interface PageResponse<T> {
    /**
     * Metadata.
     */
    metadata: PageMetadata;
    /**
     * An array of entities.
     */
    results: T[];
}

export interface CommonQueryParams {
    /**
     * Page, default is 0.
     */
    page?: number;
    /**
     * Page size, default is 100.
     */
    pageSize?: number;
}
