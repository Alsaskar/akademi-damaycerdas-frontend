import DynamicPagination from "@/components/DynamicPagination";
import ModalAddLibrary from "@/modules/library/components/ModalAdd";
import ModalDeleteLibrary from "@/modules/library/components/ModalDelete";
import TableLibrary from "@/modules/library/components/TableLibrary";
import { useLibrary } from "@/modules/library/hooks/useLibrary";
import { useEffect, useState } from "react";

const Layout = () => {
    const { fetchLibrary } = useLibrary()
    const [libraries, setLibraries] = useState([])

    // pagination state
    const [page, setPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [search, setSearch] = useState("")
    const [status, setStatus] = useState("")
    const [selectedData, setSelectedData] = useState([])

    const [showModalAdd, setShowModalAdd] = useState(false);
    const _handleShowModalAdd = () => setShowModalAdd(true);
    const _handleCloseModalAdd = () => setShowModalAdd(false);

    const [showModalDelete, setShowModalDelete] = useState(false)
    const _handleShowModalDelete = (data) => {
        setSelectedData(data)
        setShowModalDelete(true)
    }
    const _handleCloseModalDelete = () => setShowModalDelete(false)

    const _fetchData = async () => {
        const res = await fetchLibrary(page, search, status);

        if (res) {
            setLibraries(res.data.data);
            setCurrentPage(res.data.currentPage);
            setTotalPages(res.data.totalPages);
        }
    };

    const handlePageChange = (number) => {
        setPage(number);
    };

    const _handleChangeStatus = (e) => {
        setStatus(e.target.value)
        setPage(1)
    }

    useEffect(() => {
        _fetchData()
    }, [page, search, status])

    return (
        <>
            <ModalAddLibrary 
                show={showModalAdd}
                handleClose={_handleCloseModalAdd}
                onSuccess={_fetchData}
            />

            <ModalDeleteLibrary 
                data={selectedData}
                show={showModalDelete}
                handleClose={_handleCloseModalDelete}
                onSuccess={_fetchData}
            />

            <h4>Library</h4>
            <div>Kelola koleksi materi digital untuk member</div><hr />

            <div className="row mb-3">
                <div className="col-md-2 col-4">
                    <button
                        className="btn btn-primary btn-sm w-100"
                        onClick={_handleShowModalAdd}
                    >
                        Tambah Dokumen
                    </button>
                </div>
            </div>

            <div className="row g-2 mb-2 align-items-end">

                {/* Search */}
                <div className="col-md-4 col-6">
                    <input
                        type="text"
                        className="form-control form-select-sm"
                        placeholder="Cari Dokumen..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="col-md-2 col-6">
                    <select className="form-select form-select-sm" onChange={_handleChangeStatus}>
                        <option value="">Semua Status</option>
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="archived">Archived</option>
                    </select>
                </div>
            </div>

            <TableLibrary
                libraries={libraries}
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

export default Layout;