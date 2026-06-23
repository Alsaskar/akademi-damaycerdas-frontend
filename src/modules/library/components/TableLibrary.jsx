import { Table, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

const getStatusBadge = (status) => {
    switch (status) {
        case 'published':
            return 'success';

        case 'draft':
            return 'warning';

        case 'archived':
            return 'secondary';

        default:
            return 'dark';
    }
};

// Download File
const _handleDowload = (id) => {
    window.open(
        `${import.meta.env.VITE_API_URL}/library/download/${id}`,
        '_blank'
    );
}

const TableLibrary = ({ libraries, onDelete }) => {
    return (
        <Table striped bordered hover responsive size="sm">
            <thead>
                <tr align="center">
                    <th>#</th>
                    <th>Title</th>
                    <th>File Type</th>
                    <th>Total Download</th>
                    <th>Status</th>
                    <th>Opsi</th>
                </tr>
            </thead>

            <tbody>
                {libraries.length > 0 ? (
                    libraries.map((data, index) => (
                        <tr key={index} align="center">
                            <td>{index + 1}</td>
                            <td>{data.title}</td>
                            <td>{data.file_type}</td>
                            <td>{data.total_download}</td>
                            <td>
                                <Badge
                                    bg={getStatusBadge(data.status)}
                                    pill
                                    className="px-3 py-2"
                                >
                                    {data.status === 'published' && (
                                        <i className="bi bi-check-circle-fill me-1"></i>
                                    )}

                                    {data.status === 'draft' && (
                                        <i className="bi bi-pencil-fill me-1"></i>
                                    )}

                                    {data.status === 'archived' && (
                                        <i className="bi bi-archive-fill me-1"></i>
                                    )}

                                    {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
                                </Badge>
                            </td>
                            <td>

                                <Button
                                    variant="info"
                                    size="sm"
                                    className="me-1"
                                    title="Detail Dokumen"
                                    as={Link}
                                    to={`/admin/library-detail/${data.id}`}
                                >
                                    <i className="bi bi-eye"></i>
                                </Button>

                                <Button
                                    variant="success"
                                    size="sm"
                                    className="me-1"
                                    title="Download Dokumen"
                                    onClick={() => {
                                        _handleDowload(data.id)
                                    }}
                                >
                                    <i className="bi bi-download"></i>
                                </Button>

                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => onDelete(data)}
                                    title="Hapus Dokumen"
                                >
                                    <i className="bi bi-trash"></i>
                                </Button>

                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="9" align="center">
                            Belum ada data
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
};

export default TableLibrary;