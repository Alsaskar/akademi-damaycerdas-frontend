import DynamicPagination from "@/components/DynamicPagination";
import MemberTrainigTable from "@/modules/training/components/MemberTrainingTable";
import ModalLeaveParticipant from "@/modules/training/components/ModalLeaveParticipant";
import ParticipantsTable from "@/modules/training/components/ParticipantsTable";
import { useTraining } from "@/modules/training/hooks/useTraining";
import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap"

const ListParticipants = ({ trainingId }) => {
    const { getParticipants } = useTraining()
    const [participants, setParticipants] = useState([])
    const [totalParticipant, setTotalParticipant] = useState(0)
    const [selectedData, setSelectedData] = useState([])

    // pagination state
    const [page, setPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [search, setSearch] = useState("")

    const [showModalDelete, setShowModalDelete] = useState(false)
    const _handleShowModalDelete = (data) => {
        setSelectedData(data)
        setShowModalDelete(true)
    }
    const _handleCloseModalDelete = () => setShowModalDelete(false)

    const _fetchData = async () => {
        const res = await getParticipants(trainingId, page, search);

        if (res) {
            setParticipants(res.data.data);
            setTotalParticipant(res.data.totalItems);
            setCurrentPage(res.data.currentPage);
            setTotalPages(res.data.totalPages);
        }
    };

    const handlePageChange = (number) => {
        setPage(number);
    };

    useEffect(() => {
        _fetchData()
    }, [page, search])

    return (
        <>
            <ModalLeaveParticipant 
                data={selectedData}
                show={showModalDelete}
                handleClose={_handleCloseModalDelete}
                onSuccess={_fetchData}
            />

            <Row className="g-3 mb-4">
                <Col md={4}>
                    <Card className="border-0 shadow-sm">
                        <Card.Body>
                            <small className="text-muted">
                                Total Participant
                            </small>

                            <h3 className="fw-bold mb-0">
                                {totalParticipant}
                            </h3>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <div className="row g-2 mb-2 align-items-end">

                {/* Search */}
                <div className="col-md-4 col-6">
                    <input
                        type="text"
                        className="form-control form-select-sm"
                        placeholder="Cari Participant..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <ParticipantsTable
                participants={participants}
                onDelete={_handleShowModalDelete}
            />

            <DynamicPagination
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
            />

        </>
    )
}

export default ListParticipants