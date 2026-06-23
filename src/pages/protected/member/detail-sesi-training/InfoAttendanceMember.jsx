import ModalConfirmAttendance from "@/modules/training-session/components/ModalConfirmAttedance";
import { useAttendance } from "@/modules/training-session/hooks/useAttendance";
import { formatTanggal, formatTime } from "@/utils/utilHook";
import { useEffect, useState } from "react"
import { Badge, Card, Col, Row, Button } from "react-bootstrap"

const InfoAttendanceMember = ({ session }) => {
    const { fetchAttendance } = useAttendance()
    const [attendance, setAttendance] = useState(null)
    const [attendanceOpened, setAttendanceOpened] = useState(false);
    const [attendanceClosed, setAttendanceClosed] = useState(false);
    const [canAttendance, setCanAttendance] = useState(false);

    const [showModalAdd, setShowModalAdd] = useState(false);
    const _handleShowModalAdd = () => setShowModalAdd(true);
    const _handleCloseModalAdd = () => setShowModalAdd(false);

    const fetchAttendanceStatus = async () => {
        const res = await fetchAttendance(session.id)

        if (res?.success) {
            setAttendance(res.data.attendance)
            setAttendanceOpened(res.data.attendanceOpened)
            setAttendanceClosed(res.data.attendanceClosed)
            setCanAttendance(res.data.canAttendance)
        }
    }

    useEffect(() => {
        if (session.id) {
            fetchAttendanceStatus()
        }
    }, [session.id])

    return (
        <>
            <ModalConfirmAttendance 
                show={showModalAdd}
                sessionId={session?.id}
                handleClose={_handleCloseModalAdd}
                onSuccess={fetchAttendanceStatus}
            />

            <Card className="border-0 shadow-sm mb-4">

                <Card.Header className="bg-white d-flex justify-content-between align-items-center">

                    <span className="fw-semibold">
                        Absensi Sesi
                    </span>

                    {attendance && (
                        <Badge bg="success">
                            Sudah Absen
                        </Badge>
                    )}

                    {!attendance && attendanceClosed && (
                        <Badge bg="danger">
                            Tidak Hadir
                        </Badge>
                    )}

                    {!attendance && attendanceOpened && !attendanceClosed && (
                        <Badge bg="warning">
                            Dibuka
                        </Badge>
                    )}

                    {!attendance && !attendanceOpened && (
                        <Badge bg="secondary">
                            Belum Dibuka
                        </Badge>
                    )}

                </Card.Header>

                <Card.Body>

                    {/* SUDAH ABSEN */}
                    {attendance && (
                        <>
                            <div className="text-center">

                                <div
                                    className="rounded-circle bg-success bg-opacity-10 d-inline-flex align-items-center justify-content-center"
                                    style={{
                                        width: "90px",
                                        height: "90px"
                                    }}
                                >
                                    <i
                                        className="bi bi-check-circle-fill text-success"
                                        style={{
                                            fontSize: "50px"
                                        }}
                                    />
                                </div>

                                <h4 className="mt-3 fw-bold">
                                    Absensi Berhasil
                                </h4>

                                <p className="text-muted">
                                    Kehadiran Anda telah tercatat pada sistem.
                                </p>

                            </div>

                            <Row className="mt-4">

                                <Col md={6}>
                                    <Card className="border">
                                        <Card.Body>

                                            <small className="text-muted">
                                                Tanggal Absen
                                            </small>

                                            <div className="fw-semibold mt-1">
                                                {formatTanggal(
                                                    attendance.attendance_date
                                                )}
                                            </div>

                                        </Card.Body>
                                    </Card>
                                </Col>

                                <Col md={6}>
                                    <Card className="border">
                                        <Card.Body>

                                            <small className="text-muted">
                                                Waktu Absen
                                            </small>

                                            <div className="fw-semibold mt-1">
                                                {formatTime(
                                                    attendance.attendance_time
                                                )}
                                            </div>

                                        </Card.Body>
                                    </Card>
                                </Col>

                            </Row>
                        </>
                    )}

                    {/* ABSENSI DIBUKA */}
                    {!attendance &&
                        attendanceOpened &&
                        !attendanceClosed && (

                            <div className="text-center">

                                <div
                                    className="rounded-circle bg-warning bg-opacity-10 d-inline-flex align-items-center justify-content-center"
                                    style={{
                                        width: "90px",
                                        height: "90px"
                                    }}
                                >
                                    <i
                                        className="bi bi-clock-fill text-warning"
                                        style={{
                                            fontSize: "45px"
                                        }}
                                    />
                                </div>

                                <h4 className="mt-3 fw-bold">
                                    Absensi Sedang Dibuka
                                </h4>

                                <p className="text-muted">
                                    Silakan lakukan absensi sebelum waktu absensi ditutup.
                                </p>

                                <Button
                                    variant="success"
                                    size="lg"
                                    onClick={_handleShowModalAdd}
                                >
                                    <i className="bi bi-check-circle me-2"></i>
                                    Absen Sekarang
                                </Button>

                            </div>
                        )}

                    {/* BELUM DIBUKA */}
                    {!attendance &&
                        !attendanceOpened &&
                        !attendanceClosed && (

                            <div className="text-center">

                                <div
                                    className="rounded-circle bg-info bg-opacity-10 d-inline-flex align-items-center justify-content-center"
                                    style={{
                                        width: "90px",
                                        height: "90px"
                                    }}
                                >
                                    <i
                                        className="bi bi-lock-fill text-info"
                                        style={{
                                            fontSize: "45px"
                                        }}
                                    />
                                </div>

                                <h4 className="mt-3 fw-bold">
                                    Absensi Belum Dibuka
                                </h4>

                                <p className="text-muted mb-0">
                                    Absensi akan tersedia
                                    {" "}
                                    {session.attendance_open_before}
                                    {" "}
                                    menit sebelum sesi dimulai.
                                </p>

                            </div>
                        )}

                    {/* TIDAK HADIR */}
                    {!attendance &&
                        attendanceClosed && (

                            <div className="text-center">

                                <div
                                    className="rounded-circle bg-danger bg-opacity-10 d-inline-flex align-items-center justify-content-center"
                                    style={{
                                        width: "90px",
                                        height: "90px"
                                    }}
                                >
                                    <i
                                        className="bi bi-x-circle-fill text-danger"
                                        style={{
                                            fontSize: "50px"
                                        }}
                                    />
                                </div>

                                <h4 className="mt-3 fw-bold">
                                    Tidak Hadir
                                </h4>

                                <p className="text-muted mb-0">
                                    Waktu absensi telah berakhir dan Anda belum melakukan absensi.
                                </p>

                            </div>
                        )}

                </Card.Body>

            </Card>
        </>
    )
}

export default InfoAttendanceMember