import { Table, Button } from "react-bootstrap";

const ParticipantsTable = ({ participants, onDelete }) => {
    return (
        <Table striped bordered hover responsive size="sm">
            <thead>
                <tr align="center">
                    <th>#</th>
                    <th>Nama</th>
                    <th>Email</th>
                    <th>Nomor HP</th>
                    <th>Opsi</th>
                </tr>
            </thead>

            <tbody>
                {participants.length > 0 ? (
                    participants.map((data, index) => (
                        <tr key={index} align="center">
                            <td>{index + 1}</td>
                            <td>{data?.member?.user?.firstname} {data?.member?.user?.lastname}</td>
                            <td>{data?.member?.user?.email}</td>
                            <td>{data?.member?.phone}</td>
                            <td>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => onDelete(data)}
                                    title="Leave Participant"
                                >
                                    <i className="bi bi-box-arrow-right"></i>
                                </Button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="9" align="center">
                            Tidak ada Participant
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
};

export default ParticipantsTable;