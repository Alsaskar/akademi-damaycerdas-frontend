import DynamicPagination from "@/components/DynamicPagination";
import { useLibraryCategory } from "@/modules/library/hooks/useCategory";
import { useLibrary } from "@/modules/library/hooks/useLibrary";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Layout = () => {
    const { fetchLibraryCategory } = useLibraryCategory()
    const { fetchLibrary } = useLibrary()
    const [libraries, setLibraries] = useState([])
    const [categories, setCategories] = useState([])

    // pagination state
    const [page, setPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [search, setSearch] = useState("")
    const [selectedCategory, setSelectedCategory] = useState([])

    const _fetchCategory = async () => {
        const res = await fetchLibraryCategory();

        if (res) {
            setCategories(res.data);
        }
    }

    const _fetchData = async () => {
        const res = await fetchLibrary(page, search, "published", selectedCategory);

        if (res) {
            setLibraries(res.data.data);
            setCurrentPage(res.data.currentPage);
            setTotalPages(res.data.totalPages);
        }
    };

    const handlePageChange = (number) => {
        setPage(number);
    };

    const _handleChangeCategory = (e) => {
        setSelectedCategory(e.target.value)
        setPage(1)
    }

    useEffect(() => {
        _fetchCategory()
    }, [])

    useEffect(() => {
        _fetchData()
    }, [page, search, selectedCategory])

    return (
        <>
            <h4>Library - Perpustakaan Digital</h4>
            <div className="text-muted">
                Temukan berbagai materi, modul, dan dokumen pembelajaran yang dapat dibaca maupun diunduh sesuai kebutuhan Anda.
            </div><hr />

            <div
                className="card border-0 shadow-sm mb-4"
                style={{
                    borderRadius: '18px'
                }}
            >
                <div className="card-body">
                    <div className="row g-2">

                        <div className="col-md-4">
                            <div className="input-group">
                                <span className="input-group-text bg-white border-end-0">
                                    <i className="bi bi-search"></i>
                                </span>

                                <input
                                    type="text"
                                    className="form-control border-start-0"
                                    placeholder="Cari Judul..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="col-md-3">
                            <select
                                className="form-select"
                                onChange={_handleChangeCategory}
                            >
                                <option value="">
                                    Semua Kategori
                                </option>

                                {categories.map((item) => (
                                    <option
                                        value={item.id}
                                        key={item.id}
                                    >
                                        {item.nama_kategori}
                                    </option>
                                ))}
                            </select>
                        </div>

                    </div>
                </div>
            </div>

            <div className="row g-4 mb-3">
                {libraries.length > 0 ? (
                    libraries.map((item) => (
                        <div
                            className="col-md-4 col-lg-3"
                            key={item.id}
                        >
                            <div
                                className="card border-0 h-100"
                                style={{
                                    borderRadius: '18px',
                                    overflow: 'hidden',
                                    boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
                                    transition: '0.3s'
                                }}
                            >
                                {/* <img
                                    src={`${import.meta.env.VITE_API_URL}/uploads/library/${item.thumbnail}`}
                                    alt={item.title}
                                    style={{
                                        height: '180px',
                                        width: '100%',
                                        objectFit: 'cover'
                                    }}
                                /> */}

                                <div className="card-body d-flex flex-column">

                                    <span
                                        className="badge bg-primary mb-2 align-self-start"
                                        style={{
                                            borderRadius: '20px',
                                            fontSize: '11px'
                                        }}
                                    >
                                        {item?.category?.nama_kategori}
                                    </span>

                                    <h6
                                        className="fw-bold mb-2"
                                        style={{
                                            minHeight: '45px'
                                        }}
                                    >
                                        {item.title}
                                    </h6>

                                    <p
                                        className="text-muted mb-3"
                                        style={{
                                            fontSize: '14px',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                            minHeight: '60px'
                                        }}
                                    >
                                        {item.description}
                                    </p>

                                    <div
                                        className="d-flex justify-content-between text-muted mb-3"
                                        style={{
                                            fontSize: '13px'
                                        }}
                                    >
                                        <span>
                                            <i className="bi bi-file-earmark me-1"></i>
                                            {item.file_type?.toUpperCase()}
                                        </span>

                                        <span>
                                            <i className="bi bi-eye me-1"></i>
                                            {item.total_views}
                                        </span>

                                        <span>
                                            <i className="bi bi-download me-1"></i>
                                            {item.total_download}
                                        </span>
                                    </div>

                                    <Link
                                        to={`/member/detail-library/${item.slug}`}
                                        className="btn btn-primary btn-sm mt-auto"
                                        style={{
                                            borderRadius: '12px',
                                            fontWeight: '600'
                                        }}
                                    >
                                        <i className="bi bi-book me-2"></i>
                                        Detail Library
                                    </Link>

                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12">
                        <div
                            className="card border-0 shadow-sm text-center p-5"
                            style={{
                                borderRadius: '20px'
                            }}
                        >
                            <i
                                className="bi bi-journal-x"
                                style={{
                                    fontSize: '60px',
                                    color: '#adb5bd'
                                }}
                            ></i>

                            <h5 className="mt-3">
                                Belum ada library
                            </h5>

                            <p className="text-muted mb-0">
                                Tidak ada dokumen yang tersedia saat ini.
                            </p>
                        </div>
                    </div>
                )}
            </div>

            <DynamicPagination
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
            />
        </>
    )
}

export default Layout;