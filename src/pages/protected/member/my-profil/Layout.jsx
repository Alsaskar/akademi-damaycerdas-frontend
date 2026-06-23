import ModalUploadFotoProfil from "@/modules/member/components/ModalUploadFotoProfil";
import { useMember } from "@/modules/member/hooks/useMember";
import { useEffect, useState } from "react";
import { Card, Row, Col, Button, Badge } from "react-bootstrap";

const Layout = () => {
    const { fetchMyProfil } = useMember()
    const [user, setUser] = useState(null)

    const [showModalUpload, setShowModalUpload] = useState(false);
    const _handleShowModalUpload = () => setShowModalUpload(true);
    const _handleCloseModalUpload = () => setShowModalUpload(false);

    const _fetchData = async () => {
        const res = await fetchMyProfil();

        if (res) {
            console.log(res.data)
            setUser(res.data)
        }
    }

    useEffect(() => {
        _fetchData()
    }, [])

    return (
        <>
            <ModalUploadFotoProfil
                show={showModalUpload}
                handleClose={_handleCloseModalUpload}
                onSuccess={_fetchData}
                memberId={user?.member?.id}
            />

            <h4>Profil Saya</h4>
            <p className="text-muted">
                Informasi akun Anda
            </p>

            <Card className="shadow-sm border-0">
                <Card.Body>

                    <Row>
                        <Col md={3} className="text-center">

                            <div
                                style={{
                                    position: "relative",
                                    display: "inline-block",
                                    cursor: "pointer"
                                }}
                                onClick={_handleShowModalUpload}
                            >
                                <img
                                    src={
                                        user?.member?.photo
                                            ? `${import.meta.env.VITE_API_URL}/assets/foto-member/${user?.member?.photo}`
                                            : `https://ui-avatars.com/api/?name=${user?.firstname}+${user?.lastname}&size=150`
                                    }
                                    alt="Avatar"
                                    className="img-fluid rounded-circle border shadow-sm"
                                    style={{
                                        width: "160px",
                                        height: "160px",
                                        objectFit: "cover",
                                        transition: "0.3s"
                                    }}
                                />

                                <div
                                    style={{
                                        position: "absolute",
                                        bottom: 0,
                                        right: 0,
                                        background: "#0d6efd",
                                        width: "38px",
                                        height: "38px",
                                        borderRadius: "50%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        color: "#fff",
                                        border: "3px solid #fff"
                                    }}
                                >
                                    <i className="bi bi-camera-fill"></i>
                                </div>
                            </div>

                            <div className="mt-2 text-muted small">
                                Klik foto untuk mengubah foto profil
                            </div>

                        </Col>

                        <Col md={9}>
                            <h4>
                                {user?.firstname} {user?.lastname}
                            </h4>

                            <div className="mb-2">
                                {user?.username}
                            </div>

                            <div>Email : {user?.email}</div>
                            <div>KKD : {user?.kkd === '' ? 'Belum ada kkd' : user?.kkd}</div>

                            <div className="mt-2">
                                <Badge bg="success">
                                    {user?.status}
                                </Badge>{" "}

                                <Badge bg="primary">
                                    {user?.role}
                                </Badge>
                            </div>
                        </Col>
                    </Row>

                    <hr />

                    <Row>
                        <Col md={6}>
                            <h6>Informasi Member</h6>

                            <table className="table table-sm">
                                <tbody>
                                    <tr>
                                        <td width="120">No HP</td>
                                        <td>: {user?.member?.phone}</td>
                                    </tr>

                                    <tr>
                                        <td>Alamat</td>
                                        <td>: {user?.member?.address}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </Col>

                        <Col md={6}>
                            <h6>Statistik</h6>

                            <table className="table table-sm">
                                <tbody>
                                    <tr>
                                        <td width="150">
                                            Training Diikuti
                                        </td>
                                        <td>
                                            : {user?.statistics?.totalTraining}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>Total Kehadiran</td>
                                        <td>
                                            : {user?.statistics?.totalAttendance}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </Col>
                    </Row>

                </Card.Body>
            </Card>
        </>
    );
}

export default Layout;