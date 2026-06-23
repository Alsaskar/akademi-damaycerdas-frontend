import { useMember } from "@/modules/member/hooks/useMember";
import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const Layout = () => {
    const navigate = useNavigate()
    const { username } = useParams()

    const { getDetailMember } = useMember()
    const [member, setMember] = useState([])

    const _fetchData = async () => {
        const res = await getDetailMember(username);

        if (res) {
            setMember(res.data);
        }
    }

    useEffect(() => {
        _fetchData()
    }, [])

    return (
        <> 
            <div
                className="d-inline-flex align-items-center gap-2 mb-3 text-primary"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/admin/member")}
            >
                <i className="bi bi-arrow-left-circle-fill fs-5"></i>
                <span className="fw-semibold">Kembali ke Data Member</span>
            </div>

            <h4>Profil Member</h4>
            <div>Dibawah ini adalah profil dari {member.firstname} {member.lastname}</div><hr />

            <Row>
                <Col md={4}>
                    <Card>
                        <Card.Body className="text-center">
                            <img
                                src={`https://ui-avatars.com/api/?name=${member.firstname}+${member.lastname}`}
                                alt="Profil Member"
                                className="rounded-circle mb-3"
                            />

                            <h4>{member.firstname} {member.lastname}</h4>

                            <p className="text-muted mb-1">
                                <i className="bi bi-envelope"></i> {member.email}
                            </p>

                            <p className="text-muted mb-1">
                                <i className="bi bi-telephone"></i> {member?.member?.phone}
                            </p>

                            <p className="text-muted">
                                <i className="bi bi-geo-alt"></i> {member?.member?.address}
                            </p>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={8}>
                    <h5>Training Yang Diikuti</h5>

                    <Row>
                        <Col md={3}>
                            <Card>
                                <Card.Body className="text-center">
                                    <i className="bi bi-mortarboard fs-1 text-primary"></i>
                                    <h3>{member?.statistics?.total_training}</h3>
                                    <small>Total Training</small>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={3}>
                            <Card>
                                <Card.Body className="text-center">
                                    <i className="bi bi-check-circle fs-1 text-success"></i>
                                    <h3>{member?.statistics?.completed}</h3>
                                    <small>Completed</small>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={3}>
                            <Card>
                                <Card.Body className="text-center">
                                    <i className="bi bi-play-circle fs-1 text-warning"></i>
                                    <h3>{member?.statistics?.ongoing}</h3>
                                    <small>Ongoing</small>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={3}>
                            <Card>
                                <Card.Body className="text-center">
                                    <i className="bi bi-clock-history fs-1 text-secondary"></i>
                                    <h3>{member?.statistics?.draft}</h3>
                                    <small>Draft</small>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default Layout;