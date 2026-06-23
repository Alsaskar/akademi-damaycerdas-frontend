import { formatDateTime } from "@/utils/utilHook";
import { Table, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

const getStatusBadge = (status) => {
    switch (status) {
        case "active":
            return <Badge bg="success">Aktif</Badge>;

        case "inactive":
            return <Badge bg="secondary">Tidak Aktif</Badge>;

        default:
            return <Badge bg="warning">{status}</Badge>;
    }
};

const TableCategoryLibrary = ({ categories, onEdit, onDelete }) => {
    return (
        <Table striped bordered hover responsive size="sm">
            <thead>
                <tr align="center">
                    <th>#</th>
                    <th>Nama Kategori</th>
                    <th>Tanggal Dibuat</th>
                    <th>Terakhir Diupdate</th>
                    <th>Opsi</th>
                </tr>
            </thead>

            <tbody>
                {categories.length > 0 ? (
                    categories.map((data, index) => (
                        <tr key={index} align="center">
                            <td>{index + 1}</td>
                            <td>{data.nama_kategori}</td>
                            <td>{formatDateTime(data.created_at)}</td>
                            <td>{formatDateTime(data.updated_at)}</td>
                            <td>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={() => onEdit(data)}
                                >
                                    <i className="bi bi-pencil"></i>
                                </Button>{" "}

                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => onDelete(data)}
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

export default TableCategoryLibrary;