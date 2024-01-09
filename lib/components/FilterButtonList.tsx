"use client";

import filters from "../model/Filters";
import FilterButton from "./FilterButton";
import { useAudioEditor } from "../contexts/AudioEditorContext";
import "../globals.css";

const FilterButtonList = () => {
    const { filterState } = useAudioEditor();

    return (
        <>
            {filters.map(filter => <FilterButton filter={filter} enabled={filterState[filter.filterId]} key={filter.filterId}></FilterButton>)}
        </>
    );
};

export default FilterButtonList;
