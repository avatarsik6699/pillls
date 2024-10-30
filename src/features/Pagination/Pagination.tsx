import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem as BasePaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Props {
  currentPage: number;
  totalPages: number;

  onChangePage: (page: number) => void;
}

const componentName: React.FC<Props> = props => {
  return (
    <Pagination className="flex items-center justify-center">
      <PaginationContent>{generatePaginationLinks(props)}</PaginationContent>
    </Pagination>
  );
};

function generatePaginationLinks({
  delta = 1,
  ...args
}: Pick<Props, "currentPage" | "totalPages" | "onChangePage"> & {
  delta?: number;
}) {
  const addPage = (page: number) => {
    pages.push(
      <BasePaginationItem key={page}>
        <PaginationLink
          onClick={() => args.onChangePage(page)}
          isActive={page === args.currentPage}
        >
          {page}
        </PaginationLink>
      </BasePaginationItem>
    );
  };

  const addEllipsis = (page: number) => {
    console.log(page);
    pages.push(
      <BasePaginationItem key={`ellipsis-${pages.length}`}>
        <PaginationLink onClick={() => args.onChangePage(page)}>
          <PaginationEllipsis />
        </PaginationLink>
      </BasePaginationItem>
    );
  };

  const left = args.currentPage - delta;
  const right = args.currentPage + delta + 1;
  const pages: JSX.Element[] = [];

  if (args.totalPages === 1) return [1];

  if (args.totalPages > 1 && args.currentPage !== 1) {
    pages.push(
      <BasePaginationItem>
        <PaginationPrevious
          onClick={() => args.onChangePage(args.currentPage - 1)}
          disabled={args.currentPage - 1 < 1}
        />
      </BasePaginationItem>
    );
  }

  for (let i = 1; i <= args.totalPages; i++) {
    if (i === 1 || i === args.totalPages || (i >= left && i < right)) {
      if (i === left && i > 2) addEllipsis(left - 1);

      if (i === args.currentPage) addPage(args.currentPage);
      else addPage(i);

      if (i === right - 1 && i < args.totalPages - 1) addEllipsis(right);
    }
  }

  if (args.totalPages > 1 && args.currentPage !== args.totalPages) {
    pages.push(
      <BasePaginationItem>
        <PaginationNext
          onClick={() => args.onChangePage(args.currentPage + 1)}
          disabled={args.currentPage > args.totalPages - 1}
        />
      </BasePaginationItem>
    );
  }

  return pages;
}

export default componentName;
