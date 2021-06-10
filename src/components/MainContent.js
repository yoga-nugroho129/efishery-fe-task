import React, { useState, useEffect, useMemo } from 'react'
import TableData from './Table/TableData'
import { useTable,  useGlobalFilter, useSortBy, usePagination  } from 'react-table'
import { CreateModal, DeleteModal, EditModal, LoadingSpinner, TablePagination, TableSearchField } from '.'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import moment from 'moment'
import { connect } from 'react-redux'
import { handleGetDataFish } from '../redux/actions'

const MainContent = ({
  isLoading,
  allDataFish,
  handleGetDataFish
}) => {
  const [dataList, setDataList] = useState([])
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState({})
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  useEffect(() => {
    handleGetDataFish()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    allDataFish !== undefined && setDataList(allDataFish.filter(item => item.uuid !== null))
  }, [allDataFish])

  const openEditModal = item => {
    setSelectedItem(item)
    setIsEditModalOpen(true)
  }

  const openDeleteModal = item => {
    setSelectedItem(item)
    setIsDeleteModalOpen(true)
  }

  const data = useMemo(() => dataList, [dataList])
  const columns = useMemo(() => [
    {
      Header: "Komoditas",
      accessor: "komoditas",
    },
    {
      Header: "Provinsi",
      accessor: "area_provinsi",
    },
    {
      Header: "Kab/Kota",
      accessor: "area_kota",
    },
    {
      Header: "Ukuran",
      accessor: "size",
    },
    {
      Header: "Harga",
      accessor: "price",
      Cell: item => <span>{new Intl.NumberFormat("id-ID", {style: "currency", currency: "IDR"}).format(item.value)}</span>
    },
    {
      Header: "Tanggal",
      accessor: "tgl_parsed",
      Cell: item => <span>{moment(item.value).format('D MMM YYYY')}</span>
    },
    {
      Header: "Aksi",
      accessor: item => (
        <div className="row-btn">
          <button 
            className="edit-btn"
            title={`Edit "${item.komoditas}" Info`}
            onClick={() => openEditModal(item)}
          >
            <FaEdit />
          </button>
          <button 
            className="delete-btn"
            title={`Hapus "${item.komoditas}"`}
            onClick={() => openDeleteModal(item)}
          >
            <FaTrashAlt size={12} />
          </button>
        </div>
      ),
      disableSortBy: true
    },
  ], [])
  const tableInstance = useTable(
    { columns, data },
    useGlobalFilter,
    useSortBy,
    usePagination
  )
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setGlobalFilter,
    prepareRow
  } = tableInstance
  const { pageIndex, globalFilter } = state

  return (
    <div className="container main-content">
      <div className="title-section">
        <h2>Harga Perikanan</h2>
      </div>
      <div className="action-container">
        <button className="add-btn" onClick={() => setIsCreateModalOpen(true)}>Tambah Data</button>
        <TableSearchField 
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </div>
      <div className="table-section">
        {
          isLoading ? <LoadingSpinner /> :
          <>
            <TableData 
              getTableProps={getTableProps}
              headerGroups={headerGroups}
              getTableBodyProps={getTableBodyProps}
              tableDataValues={dataList}
              page={page}
              prepareRow={prepareRow}
            />
            <TablePagination 
              pageIndex={pageIndex}
              pageOptions={pageOptions}
              gotoPage={gotoPage}
              previousPage={previousPage}
              nextPage={nextPage}
              canPreviousPage={canPreviousPage}
              canNextPage={canNextPage}
              pageCount={pageCount}
            />
          </>
        }
      </div>
      <CreateModal
        isCreateModalOpen={isCreateModalOpen}
        setIsCreateModalOpen={setIsCreateModalOpen}
      />
      <DeleteModal 
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        selectedItem={selectedItem}
        />
      <EditModal
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        selectedItem={selectedItem}
      />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    isLoading: state.isLoading,
    allDataFish: state.allDataFish
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleGetDataFish: () => dispatch(handleGetDataFish())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContent)
