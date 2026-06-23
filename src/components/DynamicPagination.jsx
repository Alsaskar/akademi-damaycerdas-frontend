import Pagination from "react-bootstrap/Pagination";

const DynamicPagination = ({ currentPage, totalPages, handlePageChange }) => {
    const renderPaginationItems = () => {
        const paginationItems = [];
        const maxVisiblePages = 5; // Jumlah maksimal halaman yang terlihat
        const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (startPage > 1) {
            paginationItems.push(
                <Pagination.First key="first" onClick={() => handlePageChange(1)} />
            );
            paginationItems.push(
                <Pagination.Prev key="prev" onClick={() => handlePageChange(currentPage - 1)} />
            );
        }

        for (let i = startPage; i <= endPage; i++) {
            paginationItems.push(
                <Pagination.Item
                    key={i}
                    active={i === currentPage}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </Pagination.Item>
            );
        }

        if (endPage < totalPages) {
            paginationItems.push(
                <Pagination.Next key="next" onClick={() => handlePageChange(currentPage + 1)} />
            );
            paginationItems.push(
                <Pagination.Last key="last" onClick={() => handlePageChange(totalPages)} />
            );
        }

        return paginationItems;
    };

    return <Pagination>{renderPaginationItems()}</Pagination>;
};

export default DynamicPagination;