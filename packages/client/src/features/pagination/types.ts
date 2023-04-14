export type Pagination = {
  page: number;
  pages: number;
  perPage: number;
  items: number;
  urls: {
    first?: string;
    last?: string;
    prev?: string;
    next?: string;
  };
};

export type PaginationProps = {
  loading: boolean;
  pagination: Pagination | null;
};
