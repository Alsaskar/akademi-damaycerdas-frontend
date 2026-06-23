import DynamicPagination from "@/components/DynamicPagination";
import ModalAddTraining from "@/modules/training/components/ModalAdd";
import ModalDeleteTraining from "@/modules/training/components/ModalDelete";
import ModalEditTraining from "@/modules/training/components/ModalEdit";
import TrainingTable from "@/modules/training/components/TrainingTable";
import { useTraining } from "@/modules/training/hooks/useTraining";
import { useEffect, useState } from "react";

const Layout = () => {
    const { fetchTraining } = useTraining()
    const [trainings, setTrainings] = useState([])

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

    const _fetchData = async () => {
        const res = await fetchTraining(page, search, status);

        if (res) {
            setTrainings(res.data.data);
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
            <ModalAddTraining 
                show={showModalAdd}
                handleClose={_handleCloseModalAdd}
                onSuccess={_fetchData}
            />

            <ModalEditTraining 
                data={selectedData}
                show={showModalEdit}
                handleClose={_handleCloseModalEdit}
                onSuccess={_fetchData}
            />

            <ModalDeleteTraining 
                data={selectedData}
                show={showModalDelete}
                handleClose={_handleCloseModalDelete}
                onSuccess={_fetchData}
            />

            <h4>Kelola Training</h4>
            <div>Data Training yang telah dibuat</div><hr />

            <div className="row mb-3">
                <div className="col-md-2 col-4">
                    <button
                        className="btn btn-primary btn-sm w-100"
                        onClick={_handleShowModalAdd}
                    >
                        Tambah Training Baru
                    </button>
                </div>
            </div>

            <div className="row g-2 mb-2 align-items-end">

                {/* Search */}
                <div className="col-md-4 col-6">
                    <input
                        type="text"
                        className="form-control form-select-sm"
                        placeholder="Cari Training..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="col-md-2 col-6">
                    <select className="form-select form-select-sm" onChange={_handleChangeStatus}>
                        <option value="">Semua Status</option>
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
            </div>

            <TrainingTable
                trainings={trainings}
                onEdit={_handleShowModalEdit}
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