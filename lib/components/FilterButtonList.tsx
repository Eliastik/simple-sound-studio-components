"use client";

import FilterButton from "./FilterButton";
import { useAudioEditor } from "../contexts/AudioEditorContext";
import "../globals.css";

const FilterButtonList = () => {
    const filterDefinitions = useAudioEditor(state => state.filterDefinitions);

    return (
        <>
            {filterDefinitions.map(filter => <FilterButton filter={filter} key={filter.filterId}></FilterButton>)}
        </>
    );
};

export default FilterButtonList;
