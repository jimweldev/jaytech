import type { StateCreator } from 'zustand';
import type { Pagination } from '@/04_types/_common/pagination';

export const createPaginationSlice: StateCreator<
  { pagination: Pagination },
  [],
  [],
  { pagination: Pagination }
> = set => ({
  pagination: {
    limit: '10',
    page: 1,
    sort: '',
    searchTerm: '',
    setLimit: limit =>
      set(state => ({ pagination: { ...state.pagination, limit } })),
    setPage: page =>
      set(state => ({ pagination: { ...state.pagination, page } })),
    setSort: sort =>
      set(state => ({ pagination: { ...state.pagination, sort } })),
    setSearchTerm: searchTerm =>
      set(state => ({ pagination: { ...state.pagination, searchTerm } })),
  },
});
