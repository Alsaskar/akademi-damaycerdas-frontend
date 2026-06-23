import { useSessionTraining } from "@/modules/training-session/hooks/useSession";
import { formatTanggal, formatTime } from "@/utils/utilHook";
import { useEffect, useState } from "react"
import { Button, Card, Col, Row } from "react-bootstrap"
import { Link } from "react-router-dom";

const ListSesiTraining = ({ trainingId }) => {
    const { fetchSession } = useSessionTraining()
    const [sessions, setSessions] = useState([])

    const _fetchData = async () => {
        const res = await fetchSession(trainingId);

        if (res) {
            setSessions(res.data);
        }
    }

    useEffect(() => {
        _fetchData()
    }, [])

    return (
        <>
            {sessions.length > 0 ? (
                sessions.map((item, index) => (
                    <Card
                        key={item.id}
                        className="border-0 shadow-sm mb-3"
                    >
                        <Card.Body>

                            <div className="d-flex justify-content-between align-items-start">
                                <div>
                                    <h5 className="fw-bold mb-2">
                                        <Link
                                            to={`/member/detail-sesi/${item.slug}`}
                                            style={{
                                                textDecoration: 'none',
                                                color: 'black'
                                            }}
                                        >
                                            Sesi {item.order_number} - {item.judul}
                                        </Link>
                                    </h5>
                                </div>
                            </div>

                            <Row className="mt-2">

                                <Col md={4}>
                                    <small className="text-muted">Tanggal</small>

                                    <div>
                                        <i className="bi bi-calendar-event me-2"></i>
                                        {formatTanggal(item.session_date)}
                                    </div>
                                </Col>

                                <Col md={4}>
                                    <small className="text-muted">Jam</small>

                                    <div>
                                        <i className="bi bi-clock me-2"></i>
                                        {formatTime(item.start_time)} - {formatTime(item.end_time)}
                                    </div>
                                </Col>

                                <Col md={4}>
                                    <small className="text-muted">
                                        Zona Waktu
                                    </small>

                                    <div>
                                        <i className="bi bi-globe me-2"></i>
                                        {item.timezone}
                                    </div>
                                </Col>

                            </Row>

                            <hr />

                            <div className="d-flex gap-2 flex-wrap">

                                {item.zoom_link && (
                                    <Button
                                        size="sm"
                                        variant="primary"
                                        href={item.zoom_link}
                                        target="_blank"
                                    >
                                        <i className="bi bi-camera-video-fill me-2"></i>
                                        Join Zoom
                                    </Button>
                                )}

                                {item.youtube_link && (
                                    <Button
                                        size="sm"
                                        variant="danger"
                                        href={item.youtube_link}
                                        target="_blank"
                                    >
                                        <i className="bi bi-youtube me-2"></i>
                                        Rekaman
                                    </Button>
                                )}

                            </div>

                            {(item.zoom_id || item.zoom_passcode) && (
                                <pre
                                    className="mt-3 p-3 rounded"
                                    style={{
                                        backgroundColor: "#f8f9fa",
                                        border: "1px solid #dee2e6",
                                        fontSize: "14px",
                                        marginBottom: 0
                                    }}
                                >
                                    {`Zoom ID       : ${item.zoom_id || '-'}
Zoom Passcode : ${item.zoom_passcode || '-'}`}
                                </pre>
                            )}

                            <hr />

                            <div className="row">
                                <div className="col-md-2 col-4">
                                    <Link
                                        size="sm"
                                        className="btn btn-success btn-sm w-100"
                                        to={`/member/detail-sesi/${item.slug}`}
                                    >
                                        <i className="bi bi-eye-fill"></i> Lihat Detail
                                    </Link>
                                </div>
                            </div>

                        </Card.Body>
                    </Card>
                ))
            ) : (
                <div className="text-center py-5 text-muted">
                    <i className="bi bi-journal-x fs-1"></i>

                    <div className="mt-2">
                        Belum ada sesi training
                    </div>
                </div>
            )}
        </>
    )
}

export default ListSesiTraining