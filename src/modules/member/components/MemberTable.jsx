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

const MemberTable = ({ members, onDelete }) => {
    return (
        <Table striped bordered hover responsive size="sm">
            <thead>
                <tr align="center">
                    <th>#</th>
                    <th>Nama</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>No HP</th>
                    <th>Status</th>
                    <th>Opsi</th>
                </tr>
            </thead>

            <tbody>
                {members.length > 0 ? (
                    members.map((data, index) => (
                        <tr key={index} align="center">
                            <td>{index + 1}</td>
                            <td>{`${data.firstname} ${data.lastname}`}</td>
                            <td>{data.username}</td>
                            <td>{data.email}</td>
                            <td>{data?.member?.phone}</td>
                            <td>{getStatusBadge(data?.status)}</td>
                            <td>
                                <Link
                                    to={`/admin/member-profil/${data.username}`} style={{textDecoration: 'none'}}
                                    size="sm"
                                    title="Lihat Detail"
                                    className="btn btn-success btn-sm"
                                >
                                    <i className="bi bi-eye"></i>
                                </Link>{" "}

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

export default MemberTable;