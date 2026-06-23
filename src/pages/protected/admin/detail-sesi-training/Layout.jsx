import ModalAddMateri from "@/modules/training-session/components/ModalAddMateri";
import ModalDeleteSession from "@/modules/training-session/components/ModalDelete";
import ModalDeleteMateri from "@/modules/training-session/components/ModalDeleteMateri";
import ModalEditSession from "@/modules/training-session/components/ModalEdit";
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

const Layout = () => {
    const { getDetailSession } = useSessionTraining()
    const { slug } = useParams()
    const [session, setSession] = useState([])
    const [attendances, setAttendances] = useState([])
    const [materi, setMateri] = useState([])

    const [selectedData, setSelectedData] = useState([])
    const [selectedDataMateri, setSelectedDataMateri] = useState([])

    const [showModalEdit, setShowModalEdit] = useState(false)
    const _handleShowModalEdit = (data) => {
        setSelectedData(data)
        setShowModalEdit(true)
    }
    const _handleCloseModalEdit = () => setShowModalEdit(false)

    const [showModalDelete, setShowModalDelete] = useState(false)
    const _handleShowModalDelete = (data) => {
        setSelectedData(data)
        setShowModalDelete(true)
    }
    const _handleCloseModalDelete = () => setShowModalDelete(false)

    /* Materi */
    const [showModalAddMateri, setShowModalAddMateri] = useState(false);
    const _handleShowModalAddMateri = () => setShowModalAddMateri(true);
    const _handleCloseModalAddMateri = () => setShowModalAddMateri(false);

    const [showModalDeleteMateri, setShowModalDeleteMateri] = useState(false)
    const _handleShowModalDeleteMateri = (data) => {
        setSelectedDataMateri(data)
        setShowModalDeleteMateri(true)
    }
    const _handleCloseModalDeleteMateri = () => setShowModalDeleteMateri(false)

    const _fetchData = async () => {
        const res = await getDetailSession(slug);

        if (res) {
            setSession(res.data.session);
            setMateri(res.data.materi);
            setAttendances(res.data.attendances);
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

            <ModalEditSession
                data={selectedData}
                show={showModalEdit}
                handleClose={_handleCloseModalEdit}
                onSuccess={_fetchData}
            />

            <ModalDeleteSession
                data={selectedData}
                show={showModalDelete}
                handleClose={_handleCloseModalDelete}
                onSuccess={_fetchData}
            />

            <ModalAddMateri
                trainingSessionId={session.id}
                show={showModalAddMateri}
                handleClose={_handleCloseModalAddMateri}
                onSuccess={_fetchData}
            />

            <ModalDeleteMateri
                show={showModalDeleteMateri}
                data={selectedDataMateri}
                handleClose={_handleCloseModalDeleteMateri}
                onSuccess={_fetchData}
            />

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

                            <div className="d-flex gap-2 mt-3 mt-md-0">
                                <Button
                                    variant="warning"
                                    onClick={() => {
                                        _handleShowModalEdit()
                                        setSelectedData(session)
                                    }}
                                >
                                    Edit Sesi
                                </Button>

                                <Button
                                    variant="danger"
                                    onClick={() => {
                                        _handleShowModalDelete()
                                        setSelectedData(session)
                                    }}
                                >
                                    Hapus Sesi
                                </Button>
                            </div>

                        </div>
                    </Card.Body>
                </Card>

                {/* STATISTIK */}
                <Row className="mb-4">

                    <Col md={4}>
                        <Card className="border-0 shadow-sm h-100">
                            <Card.Body>
                                <div className="text-muted">
                                    Total Peserta Hadir
                                </div>

                                <h2 className="fw-bold mb-0">
                                    {attendances.length}
                                </h2>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={4}>
                        <Card className="border-0 shadow-sm h-100">
                            <Card.Body>
                                <div className="text-muted">
                                    Total Materi
                                </div>

                                <h2 className="fw-bold mb-0">
                                    {materi.length}
                                </h2>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={4}>
                        <Card className="border-0 shadow-sm h-100">
                            <Card.Body>
                                <div className="text-muted">
                                    Status Sesi
                                </div>

                                <h5 className="mb-0 mt-2">
                                    <Badge bg="success">
                                        {session.status}
                                    </Badge>
                                </h5>
                            </Card.Body>
                        </Card>
                    </Col>

                </Row>

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

                {/* MATERI */}
                <Card className="border-0 shadow-sm mb-4">
                    <Card.Header className="bg-white d-flex justify-content-between align-items-center">
                        <span className="fw-semibold">
                            Materi Training
                        </span>

                        <Button
                            size="sm"
                            onClick={_handleShowModalAddMateri}
                        >
                            Tambah Materi
                        </Button>
                    </Card.Header>

                    <ListGroup variant="flush">

                        {materi.length > 0 ?
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

                {/* ATTENDANCE */}
                <Card className="border-0 shadow-sm">
                    <Card.Header className="bg-white fw-semibold">
                        Daftar Kehadiran Peserta
                    </Card.Header>

                    <Card.Body className="p-0">

                        <Table
                            responsive
                            hover
                            className="mb-0 align-middle"
                        >
                            <thead>
                                <tr>
                                    <th width="80">#</th>
                                    <th>Nama Peserta</th>
                                    <th>Tanggal</th>
                                    <th>Jam Masuk</th>
                                </tr>
                            </thead>

                            <tbody>

                                {attendances.length > 0 ?
                                    attendances.map((item, index) => {
                                        return (
                                            <tr key={item.id}>
                                                <td>{index + 1}</td>
                                                <td>{item?.member?.user?.firstname} {item?.member?.user?.lastname}</td>
                                                <td>{formatTanggal(item.attendance_date)}</td>
                                                <td>{formatTime(item.attendance_time)}</td>
                                            </tr>
                                        )
                                    })
                                    :
                                    <tr>
                                        <td colSpan={4} align="center">Belum ada peserta yang hadir</td>
                                    </tr>
                                }

                            </tbody>
                        </Table>

                    </Card.Body>
                </Card>

            </div>
        </>
    );
};

export default Layout;