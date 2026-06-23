import DynamicPagination from "@/components/DynamicPagination";
import MemberTable from "@/modules/member/components/MemberTable";
import ModalAddMember from "@/modules/member/components/ModalAdd";
import ModalDeleteMember from "@/modules/member/components/ModalDelete";
import { useMember } from "@/modules/member/hooks/useMember";
import { useEffect, useState } from "react";

const Layout = () => {
    const { fetchMember } = useMember()
    const [members, setMembers] = useState([])

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
        const res = await fetchMember(page, search, status);

        if (res) {
            setMembers(res.data.data);
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
            <h4>Kelola Member</h4>
            <div>Data Member yang telah terdaftar di Akademi Damay Cerdas</div><hr />

            <ModalAddMember
                show={showModalAdd}
                handleClose={_handleCloseModalAdd}
                onSuccess={_fetchData}
            />

            <ModalDeleteMember
                data={selectedData}
                show={showModalDelete}
                handleClose={_handleCloseModalDelete}
                onSuccess={_fetchData}
            />

            <div className="row mb-3">
                <div className="col-md-2 col-4">
                    <button
                        className="btn btn-primary btn-sm w-100"
                        onClick={_handleShowModalAdd}
                    >
                        Daftarkan Member
                    </button>
                </div>
            </div>

            <div className="row g-2 mb-2 align-items-end">

                {/* Search */}
                <div className="col-md-4 col-6">
                    <input
                        type="text"
                        className="form-control form-select-sm"
                        placeholder="Cari Member..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="col-md-2 col-6">
                    <select className="form-select form-select-sm" onChange={_handleChangeStatus}>
                        <option value="">Semua Status</option>
                        <option value="active">Aktif</option>
                        <option value="inactive">Tidak Aktif</option>
                    </select>
                </div>
            </div>

            <MemberTable
                members={members}
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