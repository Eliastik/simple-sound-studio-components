import Filter from "../model/Filter";
import FilterService from "./FilterService";
import filters from "../model/DefaultFilters";

/**
 * A generic FilterService with the default filters
 */
export default class GenericFilterService implements FilterService {

    private filterMap: Map<string, Filter> = new Map();

    constructor() {
        this.addFilter(...filters);
    }

    getFilterNames(): string[] {
        return Array.from(this.filterMap.keys());
    }

    getAllFilters(): Filter[] {
        return Array.from(this.filterMap.values());
    }

    getFilter(name: string): Filter | undefined {
        return this.filterMap.get(name);
    }

    addFilter(...filters: Filter[]): void {
        for (const filter of filters) {
            this.filterMap.set(filter.filterId, filter);
        }
    }

    removeFilter(name: string): boolean {
        return this.filterMap.delete(name);
    }

    filterExists(name: string): boolean {
        return typeof this.getFilter(name) !== "undefined";
    }

    updateFilter(name: string, updatedFilter: Partial<Filter>): boolean {
        const existingFilter = this.getFilter(name);

        if (existingFilter) {
            this.filterMap.set(name, { ...existingFilter, ...updatedFilter });
            return true;
        }

        return false;
    }
}
