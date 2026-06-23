import { AuthContext } from "@/context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import AvailableTraining from "./AvailableTraining";
import { useDashboard } from "@/modules/dashboard/hooks/useDashboard";

const Layout = () => {
    const { user } = useContext(AuthContext)
    const { fetchMemberDashboard } = useDashboard()
    const [summary, setSummary] = useState(null)

    const _fetchData = async () => {
        const res = await fetchMemberDashboard();

        if (res) {
            setSummary(res.data)
        }
    }

    useEffect(() => {
        _fetchData()
    }, [])

    return (
        <>
            <h4>Hai, {user.firstname} {user.lastname}</h4>
            <div>Anda masuk sebagai Member</div><hr />

            <Row className="g-3 mb-4">

                <Col md={3}>
                    <Card className="border-0 shadow-sm">
                        <Card.Body>
                            <small className="text-muted">
                                Total Training
                            </small>

                            <h3 className="fw-bold mb-0">
                                {summary?.totalTraining}
                            </h3>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={3}>
                    <Card className="border-0 shadow-sm">
                        <Card.Body>
                            <small className="text-muted">
                                Upcoming Training
                            </small>

                            <h3 className="fw-bold text-primary mb-0">
                                {summary?.upcomingTraining}
                            </h3>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={3}>
                    <Card className="border-0 shadow-sm">
                        <Card.Body>
                            <small className="text-muted">
                                Completed
                            </small>

                            <h3 className="fw-bold text-success mb-0">
                                {summary?.completedTraining}
                            </h3>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={3}>
                    <Card className="border-0 shadow-sm">
                        <Card.Body>
                            <small className="text-muted">
                                Kehadiran
                            </small>

                            <h3 className="fw-bold text-warning mb-0">
                                {summary?.attendancePercentage}%
                            </h3>
                        </Card.Body>
                    </Card>
                </Col>

            </Row>

            {/* List Member Yang Ikut */}
            <Card className="shadow-sm border-0">
                <Card.Header className="bg-white fw-bold">
                    Training Yang Tersedia
                </Card.Header>

                <Card.Body>

                    <AvailableTraining />

                </Card.Body>
            </Card>
        </>
    )
}

export default Layout;