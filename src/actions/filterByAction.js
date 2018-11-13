export const addFilter = (filterData) => {
    return {
        type: 'ADD_FILTER',
        payload: filterData
    }
}

export const deleteFilter = (filterField) => {
    return {
        type: 'DELETE_FILTER',
        payload: filterField
    }
}

export const resetFilters = () => {
    return {
        type: 'RESET_FILTERS',
    }
}