import { AuthContext } from "@/context/AuthContext";
import { useDashboard } from "@/modules/dashboard/hooks/useDashboard";
import { useContext, useEffect, useState } from "react";
import { Badge, Card, Col, Row } from "react-bootstrap";

const Layout = () => {
    const { user } = useContext(AuthContext)
    const { fetchAdminDashboard } = useDashboard()

    const [dashboard, setDashboard] = useState({
        totalTraining: 0,
        totalMember: 0,
        totalMateri: 0,
        draftTraining: 0,
        publishedTraining: 0,
        completedTraining: 0
    });

    const _fetchData = async () => {
        const res = await fetchAdminDashboard();

        if (res) {
            setDashboard(res.data)
        }
    }

    useEffect(() => {
        _fetchData()
    }, [])

    return (
        <>
            <h4>Hai, {user.firstname} {user.lastname}</h4>
            <div>Anda masuk sebagai <b>Admin</b>. Silahkan kelola data melalui sistem ini</div><hr />

            <Row className="g-3 mb-4">
                <Col md={4}>
                    <Card
                        className="border-0 shadow-sm text-white"
                        style={{
                            background:
                                "linear-gradient(135deg, #0d6efd, #3d8bfd)"
                        }}
                    >
                        <Card.Body>
                            <div className="d-flex justify-content-between">
                                <div>
                                    <small>Total Training</small>
                                    <h2 className="fw-bold mt-2">{dashboard?.totalTraining}</h2>
                                </div>

                                <div style={{ fontSize: "40px" }}>
                                    📚
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card
                        className="border-0 shadow-sm text-white"
                        style={{
                            background:
                                "linear-gradient(135deg, #198754, #28a745)"
                        }}
                    >
                        <Card.Body>
                            <div className="d-flex justify-content-between">
                                <div>
                                    <small>Total Member</small>
                                    <h2 className="fw-bold mt-2">{dashboard?.totalMember}</h2>
                                </div>

                                <div style={{ fontSize: "40px" }}>
                                    👨‍🎓
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card
                        className="border-0 shadow-sm text-white"
                        style={{
                            background:
                                "linear-gradient(135deg, #fd7e14, #ff922b)"
                        }}
                    >
                        <Card.Body>
                            <div className="d-flex justify-content-between">
                                <div>
                                    <small>Total Materi</small>
                                    <h2 className="fw-bold mt-2">{dashboard?.totalMateri}</h2>
                                </div>

                                <div style={{ fontSize: "40px" }}>
                                    📄
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Card className="shadow-sm border-0">
                <Card.Body>
                    <h5 className="mb-3">
                        Status Training
                    </h5>

                    <div className="d-flex gap-3 flex-wrap">

                        <Badge bg="warning">
                            Draft : {dashboard?.draftTraining}
                        </Badge>

                        <Badge bg="success">
                            Published : {dashboard?.publishedTraining}
                        </Badge>

                        <Badge bg="primary">
                            Completed : {dashboard?.completedTraining}
                        </Badge>

                    </div>
                </Card.Body>
            </Card>
        </>
    )
}

export default Layout;