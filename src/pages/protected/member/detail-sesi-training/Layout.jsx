import { useSessionTraining } from "@/modules/training-session/hooks/useSession";
import { formatTanggal, formatTime } from "@/utils/utilHook";
import { useEffect, useState } from "react";
import {
    Badge,
    Button,
    Card,
    Col,
    ListGroup,
    Row,
    Table
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import InfoAttendanceMember from "./InfoAttendanceMember";

const Layout = () => {
    const { getDetailSession } = useSessionTraining()
    const { slug } = useParams()
    const [session, setSession] = useState([])
    const [materi, setMateri] = useState([])

    const _fetchData = async () => {
        const res = await getDetailSession(slug);

        if (res) {
            setSession(res.data.session);
            setMateri(res.data.materi);
        }
    }

    // Download File Materi
    const handleDownloadMateri = (id) => {
        window.open(
            `${import.meta.env.VITE_API_URL}/materi/download/${id}`,
            '_blank'
        );
    }

    useEffect(() => {
        _fetchData()
    }, [])

    return (
        <>
            <div className="container-fluid py-4">

                {/* HEADER */}
                <Card className="border-0 shadow-sm mb-4">
                    <Card.Body>
                        <div className="d-flex justify-content-between align-items-start flex-wrap">

                            <div>
                                <div className="mb-2">
                                    <Badge bg="primary">
                                        Sesi {session?.order_number}
                                    </Badge>
                                </div>

                                <h3 className="fw-bold mb-2">
                                    {session?.judul}
                                </h3>

                                <div className="text-muted">
                                    {formatTanggal(session?.session_date || '0000-00-00')} • {formatTime(session?.start_time)} - {formatTime(session?.end_time)}
                                </div>
                            </div>

                        </div>
                    </Card.Body>
                </Card>

                {/* INFORMASI */}
                <Row className="mb-4">

                    <Col lg={6}>
                        <Card className="border-0 shadow-sm h-100">
                            <Card.Header className="bg-white fw-semibold">
                                Informasi Sesi
                            </Card.Header>

                            <Card.Body>

                                <div className="mb-3">
                                    <small className="text-muted">
                                        Tanggal Sesi
                                    </small>
                                    <div>
                                        {formatTanggal(session.session_date || '0000-00-00')}
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <small className="text-muted">
                                        Waktu
                                    </small>
                                    <div>
                                        {formatTime(session.start_time)} - {formatTime(session.end_time)}
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <small className="text-muted">
                                        Absensi Dibuka
                                    </small>
                                    <div>
                                        {session.attendance_open_before} menit sebelum sesi
                                    </div>
                                </div>

                                <div>
                                    <small className="text-muted">
                                        Absensi Ditutup
                                    </small>
                                    <div>
                                        {session.attendance_close_after} menit setelah sesi dimulai
                                    </div>
                                </div>

                            </Card.Body>
                        </Card>
                    </Col>

                    <Col lg={6}>
                        <Card className="border-0 shadow-sm h-100">
                            <Card.Header className="bg-white fw-semibold">
                                Informasi Meeting
                            </Card.Header>

                            <Card.Body>

                                <div className="mb-3">
                                    <small className="text-muted">
                                        Zoom ID
                                    </small>

                                    <div>
                                        {session.zoom_id}
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <small className="text-muted">
                                        Passcode
                                    </small>

                                    <div>
                                        {session.zoom_passcode}
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <small className="text-muted">
                                        Zoom Link
                                    </small>

                                    <div>
                                        <a
                                            href={session.zoom_link}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Buka Zoom
                                        </a>
                                    </div>
                                </div>

                                <div>
                                    <small className="text-muted">
                                        Youtube Link
                                    </small>

                                    <div>
                                        <a
                                            href={session.youtube_link}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Buka Youtube
                                        </a>
                                    </div>
                                </div>

                            </Card.Body>
                        </Card>
                    </Col>

                </Row>

                {/* Informasi Absensi Member */}
                <InfoAttendanceMember
                    session={session}
                />

                {/* MATERI */}
                <Card className="border-0 shadow-sm mb-4">
                    <Card.Header className="bg-white d-flex justify-content-between align-items-center">
                        <span className="fw-semibold">
                            Materi Training
                        </span>
                    </Card.Header>

                    <ListGroup variant="flush">

                        {materi.length < 0 ?
                            materi.map((item) => {
                                return (
                                    <ListGroup.Item
                                        key={item.id}
                                        className="d-flex justify-content-between align-items-center"
                                    >
                                        <div>
                                            <div className="fw-semibold">
                                                {item.title}
                                            </div>

                                            <small className="text-muted">
                                                {item.file_type.toUpperCase()}
                                            </small>
                                        </div>

                                        <div className="d-flex gap-2">
                                            <Button
                                                variant="outline-primary"
                                                size="sm"
                                                onClick={() => handleDownloadMateri(item.id)}
                                            >
                                                Download
                                            </Button>

                                            <Button
                                                variant="outline-danger"
                                                size="sm"
                                                onClick={() => {
                                                    _handleShowModalDeleteMateri()
                                                    setSelectedDataMateri(item)
                                                }}
                                            >
                                                Hapus
                                            </Button>
                                        </div>
                                    </ListGroup.Item>
                                )
                            })
                            :
                            <div className="p-3">
                                <h6>Belum ada Materi. Silahkan tambahkan</h6>
                            </div>
                        }

                    </ListGroup>
                </Card>

            </div>
        </>
    );
};

export default Layout;