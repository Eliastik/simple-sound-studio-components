import Filter from "../model/Filter";
import FilterService from "./FilterService";
import filters from "../model/DefaultFilters";

/**
 * A generic FilterService with the default filters
 */
export default class GenericFilterService implements FilterService {

    private filterMap: Map<string, Filter> = new Map();
    private onFilterUpdatedCallback: ((filters: Filter[]) => void) | null = null;

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

    filterExists(name: string): boolean {
        return typeof this.getFilter(name) !== "undefined";
    }

    addFilter(...filters: Filter[]): void {
        for (const filter of filters) {
            this.filterMap.set(filter.filterId, filter);
        }

        this.callCallback();
    }

    removeFilter(name: string): boolean {
        const deleted = this.filterMap.delete(name);
        this.callCallback();
        return deleted;
    }

    updateFilter(name: string, updatedFilter: Partial<Filter>): boolean {
        const existingFilter = this.getFilter(name);

        if (existingFilter) {
            this.filterMap.set(name, { ...existingFilter, ...updatedFilter });
            this.callCallback();
            return true;
        }

        return false;
    }

    onFilterUpdated(callback: (filters: Filter[]) => void): void {
        this.onFilterUpdatedCallback = callback;
    }

    private callCallback() {
        if (this.onFilterUpdatedCallback) {
            this.onFilterUpdatedCallback(this.getAllFilters());
        }
    }
}
