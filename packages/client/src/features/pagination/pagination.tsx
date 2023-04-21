import { Link, useLocation } from 'react-router-dom';
import { perPageItemsCount } from '@constants';
import { Spinner } from '@components';
import { cn, kebab } from '@bem';
import { PaginationProps } from '@features/pagination/types';

const namespace = 'pagination-block';
const block = cn(namespace);

const getLink = (linkContent: number | JSX.Element, anchor: string | undefined): JSX.Element | undefined => {
  return anchor ? (
    <li className="page-item">
      <Link className={kebab(block('link', ['page-link rounded-0']))} to={anchor}>
        {linkContent}
      </Link>
    </li>
  ) : undefined;
};

export const PaginationBlock = ({ loading, pagination }: PaginationProps) => {
  const location = useLocation();
  const uri = location.pathname;

  const currentPage = pagination?.page ?? 1;

  const firstLink = pagination?.urls.first ? uri : undefined;
  const prevLink = pagination?.urls.prev ? `${uri}?page=${currentPage - 1}&per_page=${perPageItemsCount}` : undefined;
  const nextLink = pagination?.urls.next ? `${uri}?page=${currentPage + 1}&per_page=${perPageItemsCount}` : undefined;
  const lastLink = pagination?.urls.last
    ? `${uri}?page=${pagination?.pages ?? 1}&per_page=${perPageItemsCount}`
    : undefined;

  const first = getLink(<span aria-hidden="true">&laquo;</span>, firstLink);
  const prev = getLink(currentPage - 1, prevLink);
  const current = (
    <li className="page-item">
      <span className={kebab(block('link', { current: true }, ['page-link rounded-0']))}>{currentPage}</span>
    </li>
  );
  const next = getLink(currentPage + 1, nextLink);
  const last = getLink(<span aria-hidden="true">&raquo;</span>, lastLink);

  return loading ? (
    <Spinner />
  ) : (
    <ul className={kebab(block(undefined, ['pagination', 'rounded-0']))}>
      {first}
      {prev}
      {current}
      {next}
      {last}
    </ul>
  );
};
