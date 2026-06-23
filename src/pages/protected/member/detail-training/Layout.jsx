import { useTraining } from "@/modules/training/hooks/useTraining";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
    Container,
    Row,
    Col,
    Card,
    Badge,
    Button,
    Spinner
} from "react-bootstrap";
import ListSesiTraining from "./ListSesiTraining";
import ModalJoinTraining from "@/modules/training/components/ModalJoinTraining";

const Layout = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { getDetailTraining } = useTraining();

    const [data, setData] = useState(null);
    const [isJoined, setIsJoined] = useState(false);
    const [selectedData, setSelectedData] = useState([])

    const [showModalJoinTraining, setShowModalJoinTraining] = useState(false);
    const _handleShowModalJoinTraining = () => setShowModalJoinTraining(true);
    const _handleCloseModalJoinTraining = () => setShowModalJoinTraining(false);

    const _fetchData = async () => {
        const res = await getDetailTraining(slug);

        if (res) {
            setIsJoined(res.data.isJoined)
            setData(res.data.training.training);
        }
    };

    useEffect(() => {
        _fetchData();
    }, []);

    const getStatusVariant = (status) => {
        switch (status) {
            case "published":
                return "success";
            case "draft":
                return "warning";
            case "completed":
                return "primary";
            default:
                return "secondary";
        }
    };

    if (!data) {
        return (
            <Container className="py-5 text-center">
                <Spinner animation="border" />
            </Container>
        );
    }

    return (
        <>
            <ModalJoinTraining
                data={selectedData}
                show={showModalJoinTraining}
                handleClose={_handleCloseModalJoinTraining}
                onSuccess={_fetchData}
            />

            <Container fluid>

                <div
                    className="d-inline-flex align-items-center gap-2 mb-3 text-primary"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/member/dashboard")}
                >
                    <i className="bi bi-arrow-left-circle-fill fs-5"></i>
                    <span className="fw-semibold">Kembali ke Dashboard</span>
                </div>

                {/* Header */}
                <Card className="shadow-sm border-0 mb-4">
                    <Card.Body>

                        <h2 className="fw-bold mb-2">
                            {data?.title}
                        </h2>

                        <Badge bg={getStatusVariant(data.status)}>
                            {data?.status.toUpperCase()}
                        </Badge><hr />

                        <h6>Trainer</h6>
                        <div>{data?.trainer_name}</div>

                        <h6 className="mt-4">Deskripsi</h6>
                        <div
                            style={{
                                lineHeight: "1.8",
                                whiteSpace: "pre-line"
                            }}
                        >
                            {data?.description}
                        </div>

                    </Card.Body>
                </Card>

                {/* List Sesi */}
                <Card className="shadow-sm border-0 mb-4">
                    <Card.Header className="bg-white fw-bold">
                        Daftar Sesi Pertemuan
                    </Card.Header>

                    <Card.Body>

                        {isJoined ? (
                            <ListSesiTraining
                                trainingId={data?.id}
                            />
                        ) : (
                            <div className="text-center py-5">

                                <div style={{ fontSize: "60px" }}>
                                    🔒
                                </div>

                                <h5 className="mt-3">
                                    Konten Training Terkunci
                                </h5>

                                <p className="text-muted">
                                    Anda harus bergabung ke training ini terlebih dahulu
                                    untuk melihat sesi, materi, link Zoom, dan video pembelajaran.
                                </p>

                                <Button
                                    variant="primary"
                                    onClick={() => {
                                        _handleShowModalJoinTraining();
                                        setSelectedData(data);
                                    }}
                                >
                                    Join Training
                                </Button>

                            </div>
                        )}

                    </Card.Body>
                </Card>

            </Container>
        </>
    );
};

export default Layout;