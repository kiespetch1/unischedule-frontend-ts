export interface AnnouncementPaginationState {
  total: number
  page: number
  onChangePage: (page: number) => void;
}