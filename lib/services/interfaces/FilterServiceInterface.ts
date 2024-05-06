import Filter from "../../model/Filter";

/**
 * Implements this interface to provide your filters to the UI
 */
export default interface FilterServiceInterface {

    /**
     * Get all filters
     */
    getAllFilters(): Filter[];

    /**
     * Get filter with given ID/name
     * @param name The ID/name of the filter
     */
    getFilter(name: string): Filter | undefined;

    /**
     * Add new filters
     * @param filters The filters
     */
    addFilter(...filters: Filter[]): void;

    /**
     * Remove filter with given ID/name
     * @param name The ID/name of the filter
     */
    removeFilter(name: string): boolean;

    /**
     * Check if a filter exists with the given ID/name
     * @param name The ID/name of the filter
     */
    filterExists(name: string): boolean;

    /**
     * Update the properties of a filter
     * @param name The ID/name of the filter
     * @param updatedFilter The partial properties to update
     */
    updateFilter(name: string, updatedFilter: Partial<Filter>): boolean;

    /**
     * Get all the filter names
     */
    getFilterNames(): string[];

    /**
     * Listen to event occurring when a filter is updated
     * @param callback The callback function
     */
    onFilterUpdated(callback: (filters: Filter[]) => void): void;

}
