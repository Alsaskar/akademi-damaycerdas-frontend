import DynamicPagination from "@/components/DynamicPagination";
import TrainingOwnTable from "@/modules/training/components/TrainingOwnTable";
import { useTraining } from "@/modules/training/hooks/useTraining";
import { useEffect, useState } from "react";

const Layout = () => {
    const { fetchMyTraining } = useTraining()
    const [trainings, setTrainings] = useState([])

    // pagination state
    const [page, setPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [search, setSearch] = useState("")

    const _fetchData = async () => {
        const res = await fetchMyTraining(page, search);

        if (res) {
            setTrainings(res.data.data);
            setCurrentPage(res.data.currentPage);
            setTotalPages(res.data.totalPages);
        }
    };

    const handlePageChange = (number) => {
        setPage(number);
    };

    useEffect(() => {
        _fetchData()
    }, [page, search, status])

    return (
        <>
            <h4>Data Training</h4>
            <div>Training yang telah saya ikuti</div><hr />

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
            </div>

            <TrainingOwnTable
                trainings={trainings}
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