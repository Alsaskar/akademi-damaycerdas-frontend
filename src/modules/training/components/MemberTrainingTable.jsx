import { Table, Button, Badge } from "react-bootstrap";
import { formatFileSize } from "../utils/formatFileSize";

const MemberTrainigTable = ({ members, onDelete }) => {
    return (
        <Table striped bordered hover responsive size="sm">
            <thead>
                <tr align="center">
                    <th>#</th>
                    <th>Member</th>
                    <th>Email</th>
                    <th>Status Kehadiran</th>
                    <th>Waktu Absensi</th>
                    <th>Opsi</th>
                </tr>
            </thead>

            <tbody>
                {members.length > 0 ? (
                    members.map((data, index) => (
                        <tr key={index} align="center">
                            <td>{index + 1}</td>
                            <td>{data.fullname}</td>
                            <td>{data.email}</td>
                            <td>
                                {data.attendanceStatus === "present" ? (
                                    <Badge bg="success">Hadir</Badge>
                                ) : data.attendanceStatus === "absent" ? (
                                    <Badge bg="danger">Tidak Hadir</Badge>
                                ) : (
                                    <Badge bg="secondary">Belum Hadir</Badge>
                                )}
                            </td>
                            <td>{data.attendanceDate || data.attendanceTime === null ? '-' : `${data.attendanceDate} ${data.attendanceTime}`}</td>
                            <td>
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
                            Belum ada member
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
};

export default MemberTrainigTable;