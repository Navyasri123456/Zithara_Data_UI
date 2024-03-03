export const clearFilters = (setNameFilter, setPhoneFilter, setSortBy, setDateFilter, setTimeFilter) => {
    setNameFilter('');
    setPhoneFilter('');
    setSortBy(null);
    setDateFilter('');
    setTimeFilter('');
};
