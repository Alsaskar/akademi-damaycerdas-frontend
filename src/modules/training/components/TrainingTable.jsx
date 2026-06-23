import { formatDateTime, formatTanggal, formatTanggalJam, formatTime } from "@/utils/utilHook";
import { Table, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

const getStatusBadge = (status) => {
    switch (status) {
        case "draft":
            return <Badge bg="warning">Draft</Badge>;

        case "published":
            return <Badge bg="success">Published</Badge>;

        case "completed":
            return <Badge bg="primary">Completed</Badge>;

        default:
            return <Badge bg="secondary">{status}</Badge>;
    }
};

const TrainingTable = ({ trainings, onEdit, onDelete }) => {
    return (
        <Table striped bordered hover responsive size="sm">
            <thead>
                <tr align="center">
                    <th>#</th>
                    <th>Title</th>
                    <th>Trainer</th>
                    <th>Status</th>
                    <th>Tanggal Dibuat</th>
                    <th>Opsi</th>
                </tr>
            </thead>

            <tbody>
                {trainings.length > 0 ? (
                    trainings.map((data, index) => (
                        <tr key={index} align="center">
                            <td>{index + 1}</td>
                            <td>{data.title}</td>
                            <td>{data.trainer_name}</td>
                            <td>{getStatusBadge(data.status)}</td>
                            <td>{formatDateTime(data.created_at)}</td>
                            <td>
                                <Link
                                    to={`/admin/detail-training/${data.slug}`} style={{textDecoration: 'none'}}
                                    size="sm"
                                    title="Lihat Detail"
                                    className="btn btn-success btn-sm"
                                >
                                    <i className="bi bi-eye"></i>
                                </Link>{" "}

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

export default TrainingTable;