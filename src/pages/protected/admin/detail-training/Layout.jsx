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
import ListParticipants from "./ListParticipants";
import ListSesiTraining from "./ListSesiTraining";

const Layout = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { getDetailTraining } = useTraining();

    const [data, setData] = useState(null);

    const _fetchData = async () => {
        const res = await getDetailTraining(slug);

        if (res) {
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
        <Container fluid>

            <div
                className="d-inline-flex align-items-center gap-2 mb-3 text-primary"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/admin/training")}
            >
                <i className="bi bi-arrow-left-circle-fill fs-5"></i>
                <span className="fw-semibold">Kembali ke Data Training</span>
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

                    <ListSesiTraining 
                        trainingId={data?.id}
                    />

                </Card.Body>
            </Card>

            {/* List Member Yang Ikut */}
            <Card className="shadow-sm border-0">
                <Card.Header className="bg-white fw-bold">
                    Participant
                </Card.Header>

                <Card.Body>

                    <ListParticipants
                        trainingId={data?.id}
                    />

                </Card.Body>
            </Card>

        </Container>
    );
};

export default Layout;