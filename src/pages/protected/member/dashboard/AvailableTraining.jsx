import DynamicPagination from "@/components/DynamicPagination";
import ModalJoinTraining from "@/modules/training/components/ModalJoinTraining";
import { useTraining } from "@/modules/training/hooks/useTraining";
import { formatTanggal, formatTime } from "@/utils/utilHook";
import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AvailableTraining = () => {
    const { fetchTraining } = useTraining()
    const [training, setTraining] = useState([])
    const [selectedData, setSelectedData] = useState([])
    const navigate = useNavigate()

    // pagination state
    const [page, setPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [search, setSearch] = useState("")

    const [showModalJoinTraining, setShowModalJoinTraining] = useState(false);
    const _handleShowModalJoinTraining = () => setShowModalJoinTraining(true);
    const _handleCloseModalJoinTraining = () => setShowModalJoinTraining(false);

    const handlePageChange = (number) => {
        setPage(number);
    };

    const _fetchData = async () => {
        const res = await fetchTraining(page, search, 'published');

        if (res) {
            setTraining(res.data.data);
            setCurrentPage(res.data.currentPage);
            setTotalPages(res.data.totalPages);
        }
    }

    useEffect(() => {
        _fetchData()
    }, [page, search])

    return (
        <>
            <ModalJoinTraining
                data={selectedData}
                show={showModalJoinTraining}
                handleClose={_handleCloseModalJoinTraining}
                onSuccess={_fetchData}
            />

            <div className="row g-2 mb-3 align-items-end">
                <div className="col-md-12 col-12">
                    <input
                        type="text"
                        className="form-control form-select-sm"
                        placeholder="Cari Training..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <Row className="g-3 mb-3">

                {training.length > 0 ? (

                    training.map(item => (

                        <Col md={4} key={item.id}>

                            <Card className="border-0 shadow-sm h-100">
                                <Card.Body className="d-flex flex-column">

                                    {/* Header */}
                                    <div className="mb-3">
                                        <div className="d-flex align-items-center gap-2">

                                            <div>
                                                <h5 className="fw-bold mb-0">{item.title}</h5>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Info Training */}
                                    <div>
                                        <div className="d-flex align-items-center gap-2">
                                            <i className="bi bi-person-workspace text-warning"></i>
                                            <small>
                                                {item.trainer_name}
                                            </small>
                                        </div>

                                    </div><hr />

                                    {/* Footer */}
                                    <div className="mt-auto d-flex gap-2">

                                        <Button
                                            variant="outline-primary"
                                            size="sm"
                                            className="w-100"
                                            onClick={() => navigate(`/member/detail-training/${item.slug}`)}
                                        >
                                            <i className="bi bi-eye me-1"></i>
                                            Detail
                                        </Button>

                                        <Button
                                            variant={item.isJoined ? "success" : "primary"}
                                            size="sm"
                                            className="w-100"
                                            disabled={item.isJoined}
                                            onClick={() => {
                                                _handleShowModalJoinTraining();
                                                setSelectedData(item);
                                            }}
                                        >
                                            <i className="bi bi-box-arrow-in-right me-1"></i>
                                            {item.isJoined ? "Sudah Join" : "Join"}
                                        </Button>

                                    </div>

                                </Card.Body>
                            </Card>

                        </Col>

                    ))

                ) : (
                    <Col xs={12}>
                        <Card className="border-0 shadow-sm">
                            <Card.Body className="text-center py-5">

                                <i
                                    className="bi bi-journal-x text-muted"
                                    style={{
                                        fontSize: "4rem"
                                    }}
                                ></i>

                                <h5 className="mt-3 mb-2">
                                    Training Tidak Tersedia
                                </h5>

                                <p className="text-muted mb-0">
                                    Saat ini belum ada training yang dapat diikuti.
                                </p>

                            </Card.Body>
                        </Card>
                    </Col>

                )}

            </Row>

            <DynamicPagination
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
            />
        </>
    )
}

export default AvailableTraining;