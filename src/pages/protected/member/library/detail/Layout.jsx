import { Card, Row, Col, Badge, Button, Spinner } from "react-bootstrap";
import { useLibrary } from "@/modules/library/hooks/useLibrary";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatDateTime } from "@/utils/utilHook";

const getStatusBadge = (status) => {
    switch (status) {
        case 'published':
            return 'success';

        case 'draft':
            return 'warning';

        case 'archived':
            return 'secondary';

        default:
            return 'dark';
    }
};

const formatBytes = (bytes) => {
    if (!bytes) return '-';

    const sizes = ['Bytes', 'KB', 'MB', 'GB'];

    const i = Math.floor(
        Math.log(bytes) / Math.log(1024)
    );

    return (
        Math.round(
            (bytes / Math.pow(1024, i)) * 100
        ) / 100 +
        ' ' +
        sizes[i]
    );
};

const Layout = () => {
    const { slug } = useParams();
    const { getDetailBySlugLibrary } = useLibrary();

    const [library, setLibrary] = useState({});
    const [loading, setLoading] = useState(true);

    const _fetchData = async () => {
        setLoading(true);

        const res = await getDetailBySlugLibrary(slug);

        if (res) {
            setLibrary(res.data);
        }

        setLoading(false);
    };

    // Download File
    const _handleDowload = (id) => {
        window.open(
            `${import.meta.env.VITE_API_URL}/library/download/${id}`,
            '_blank'
        );
    }

    useEffect(() => {
        _fetchData();
    }, []);

    if (loading) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" />
            </div>
        );
    }

    return (
        <>
            <Card className="border-0 shadow-sm mb-4">
                <Card.Body>

                    <div className="d-flex justify-content-between align-items-start">

                        <div>
                            <div className="d-flex align-items-center mb-2">
                                <div
                                    className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center me-3"
                                    style={{
                                        width: '60px',
                                        height: '60px'
                                    }}
                                >
                                    <i className="bi bi-file-earmark-text fs-3 text-primary"></i>
                                </div>

                                <div>
                                    <h3 className="fw-bold mb-1">
                                        {library.title}
                                    </h3>

                                    <Badge
                                        bg={getStatusBadge(library.status)}
                                        pill
                                        className="px-3 py-2"
                                    >
                                        {library.status?.charAt(0).toUpperCase() + library.status?.slice(1)}
                                    </Badge>
                                </div>
                            </div>
                        </div>

                    </div>

                    <hr />

                    <p className="text-muted mb-0">
                        {library.description || '-'}
                    </p>

                </Card.Body>
            </Card>

            <Row className="g-3 mb-4">

                <Col md={4}>
                    <Card className="border-0 shadow-sm h-100">
                        <Card.Body className="text-center">

                            <div
                                className="rounded-circle bg-primary bg-opacity-10 d-inline-flex align-items-center justify-content-center"
                                style={{
                                    width: '70px',
                                    height: '70px'
                                }}
                            >
                                <i className="bi bi-file-earmark fs-2 text-primary"></i>
                            </div>

                            <h6 className="text-muted mt-3 mb-1">
                                File Type
                            </h6>

                            <h4 className="fw-bold text-uppercase mb-0">
                                {library.file_type || '-'}
                            </h4>

                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="border-0 shadow-sm h-100">
                        <Card.Body className="text-center">

                            <div
                                className="rounded-circle bg-success bg-opacity-10 d-inline-flex align-items-center justify-content-center"
                                style={{
                                    width: '70px',
                                    height: '70px'
                                }}
                            >
                                <i className="bi bi-download fs-2 text-success"></i>
                            </div>

                            <h6 className="text-muted mt-3 mb-1">
                                Total Download
                            </h6>

                            <h4 className="fw-bold mb-0">
                                {library.total_download || 0}
                            </h4>

                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="border-0 shadow-sm h-100">
                        <Card.Body className="text-center">

                            <div
                                className="rounded-circle bg-info bg-opacity-10 d-inline-flex align-items-center justify-content-center"
                                style={{
                                    width: '70px',
                                    height: '70px'
                                }}
                            >
                                <i className="bi bi-eye fs-2 text-info"></i>
                            </div>

                            <h6 className="text-muted mt-3 mb-1">
                                Total Views
                            </h6>

                            <h4 className="fw-bold mb-0">
                                {library.total_views || 0}
                            </h4>

                        </Card.Body>
                    </Card>
                </Col>

            </Row>

            <Card className="border-0 shadow-sm">
                <Card.Header className="bg-white py-3">
                    <h5 className="mb-0">
                        <i className="bi bi-info-circle me-2"></i>
                        Informasi Dokumen
                    </h5>
                </Card.Header>

                <Card.Body>

                    <Row className="g-4">

                        <Col md={6}>
                            <div className="border rounded p-3 h-100">
                                <small className="text-muted d-block mb-1">
                                    Nama File
                                </small>

                                <div className="fw-semibold">
                                    {library.file_name || '-'}
                                </div>
                            </div>
                        </Col>

                        <Col md={6}>
                            <div className="border rounded p-3 h-100">
                                <small className="text-muted d-block mb-1">
                                    Ukuran File
                                </small>

                                <div className="fw-semibold">
                                    {formatBytes(library.file_size)}
                                </div>
                            </div>
                        </Col>

                        <Col md={6}>
                            <div className="border rounded p-3 h-100">
                                <small className="text-muted d-block mb-1">
                                    Dibuat Pada
                                </small>

                                <div className="fw-semibold">
                                    {formatDateTime(library.created_at || '-')}
                                </div>
                            </div>
                        </Col>

                        <Col md={6}>
                            <div className="border rounded p-3 h-100">
                                <small className="text-muted d-block mb-1">
                                    Terakhir Diupdate
                                </small>

                                <div className="fw-semibold">
                                    {formatDateTime(library.updated_at || '-')}
                                </div>
                            </div>
                        </Col>

                    </Row>

                    <hr />

                    <div className="d-flex gap-2">

                        <Button
                            variant="success"
                            size="sm"
                            className="me-1"
                            title="Download Dokumen"
                            onClick={() => {
                                _handleDowload(library.id)
                            }}
                        >
                            <i className="bi bi-download me-2"></i>
                            Download Dokumen
                        </Button>

                    </div>

                </Card.Body>
            </Card>
        </>
    );
};

export default Layout;