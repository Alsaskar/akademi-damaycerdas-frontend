import ModalAddCategory from "@/modules/library/components/ModalAddCategory";
import ModalDeleteCategory from "@/modules/library/components/ModalDeleteCategory";
import ModalEditCategory from "@/modules/library/components/ModalEditCategory";
import TableCategoryLibrary from "@/modules/library/components/TableCategoryLibrary";
import { useLibraryCategory } from "@/modules/library/hooks/useCategory";
import { useEffect, useState } from "react";

const Layout = () => {
    const { fetchLibraryCategory } = useLibraryCategory()
    const [categories, setCategories] = useState([])

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
        const res = await fetchLibraryCategory();

        if (res) {
            setCategories(res.data);
        }
    };

    useEffect(() => {
        _fetchData()
    }, [])

    return (
        <>
            <h4>Data Kategori</h4>
            <div>Kelola data kategori untuk Dokumen yang ada</div><hr />

            <ModalAddCategory
                show={showModalAdd}
                handleClose={_handleCloseModalAdd}
                onSuccess={_fetchData}
            />

            <ModalEditCategory
                data={selectedData}
                show={showModalEdit}
                handleClose={_handleCloseModalEdit}
                onSuccess={_fetchData}
            />

            <ModalDeleteCategory
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
                        Tambah Kategori Baru
                    </button>
                </div>
            </div>

            <TableCategoryLibrary
                categories={categories}
                onEdit={_handleShowModalEdit}
                onDelete={_handleShowModalDelete}
            />
        </>
    )
}

export default Layout;