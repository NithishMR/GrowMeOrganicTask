import React from "react";
import { Paginator } from "primereact/paginator";

interface PaginationProps {
  totalRecords: number;
  rowsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (size: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalRecords,
  rowsPerPage,
  currentPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const handlePageChange = (event: { first: number; rows: number }) => {
    const page = Math.floor(event.first / event.rows) + 1;
    onPageChange(page);
  };

  return (
    <div className="p-4">
      <Paginator
        first={(currentPage - 1) * rowsPerPage}
        rows={rowsPerPage}
        totalRecords={totalRecords}
        rowsPerPageOptions={[10, 20, 30]}
        onPageChange={handlePageChange}
        template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
      />
    </div>
  );
};

export default Pagination;
