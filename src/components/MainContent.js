import React, { useState, useMemo } from 'react'
import TableData from './Table/TableData'
import { useTable,  useGlobalFilter, useSortBy, usePagination  } from 'react-table'
import { TablePagination, TableSearchField } from '.'

const MainContent = () => {
  const [dataList, setDataList] = useState([
    {
      "uuid": "kotlin.random.XorWowRandom@64a9d2f",
      "komoditas": "Gabus",
      "area_provinsi": "BALI",
      "area_kota": "BULELENG",
      "size": "140",
      "price": "25000",
      "tgl_parsed": "2020-06-08T10:46:21.374Z",
      "timestamp": "1591587981374"
    },
    {
      "uuid": "kotlin.random.XorWowRandom@ea1ec3b",
      "komoditas": "Bandeng",
      "area_provinsi": "SULAWESI BARAT",
      "area_kota": "MAMUJU UTARA",
      "size": "140",
      "price": "20000",
      "tgl_parsed": "2020-06-08T10:46:21.374Z",
      "timestamp": "1591587981374"
    },
    {
      "uuid": "e776757d-2547-44d8-84fe-1258b5ec945c",
      "komoditas": "Sepat",
      "area_provinsi": "SUMATERA BARAT",
      "area_kota": "PADANG PARIAMAN",
      "size": "130",
      "price": "23000",
      "tgl_parsed": "2020-06-08T10:46:21.374Z",
      "timestamp": "1591587981374"
    },
    {
      "uuid": "a9e10e7d-d385-49b5-ac55-fe6d04f300af",
      "komoditas": "Patin Albino",
      "area_provinsi": "LAMPUNG",
      "area_kota": "LAMPUNG TIMUR",
      "size": "120",
      "price": "20000",
      "tgl_parsed": "2020-06-08T12:14:31.719Z",
      "timestamp": "1591593271719"
    },
    {
      "uuid": "57d8839f-6583-46c9-8e5d-67175363332d",
      "komoditas": "Teri",
      "area_provinsi": "BANTEN",
      "area_kota": "CIREBON",
      "size": "50",
      "price": "90000",
      "tgl_parsed": "2020-06-09T15:08:58.122Z",
      "timestamp": "1591690138122"
    },
    {
      "uuid": "kotlin.random.XorWowRandom@64a9d2f",
      "komoditas": "Gabus",
      "area_provinsi": "BALI",
      "area_kota": "BULELENG",
      "size": "140",
      "price": "25000",
      "tgl_parsed": "2020-06-08T10:46:21.374Z",
      "timestamp": "1591587981374"
    },
    {
      "uuid": "kotlin.random.XorWowRandom@ea1ec3b",
      "komoditas": "Bandeng",
      "area_provinsi": "SULAWESI BARAT",
      "area_kota": "MAMUJU UTARA",
      "size": "140",
      "price": "20000",
      "tgl_parsed": "2020-06-08T10:46:21.374Z",
      "timestamp": "1591587981374"
    },
    {
      "uuid": "e776757d-2547-44d8-84fe-1258b5ec945c",
      "komoditas": "Sepat",
      "area_provinsi": "SUMATERA BARAT",
      "area_kota": "PADANG PARIAMAN",
      "size": "130",
      "price": "23000",
      "tgl_parsed": "2020-06-08T10:46:21.374Z",
      "timestamp": "1591587981374"
    },
    {
      "uuid": "a9e10e7d-d385-49b5-ac55-fe6d04f300af",
      "komoditas": "Patin Albino",
      "area_provinsi": "LAMPUNG",
      "area_kota": "LAMPUNG TIMUR",
      "size": "120",
      "price": "20000",
      "tgl_parsed": "2020-06-08T12:14:31.719Z",
      "timestamp": "1591593271719"
    },
    {
      "uuid": "57d8839f-6583-46c9-8e5d-67175363332d",
      "komoditas": "Teri",
      "area_provinsi": "BANTEN",
      "area_kota": "CIREBON",
      "size": "50",
      "price": "90000",
      "tgl_parsed": "2020-06-09T15:08:58.122Z",
      "timestamp": "1591690138122"
    },
    {
      "uuid": "kotlin.random.XorWowRandom@64a9d2f",
      "komoditas": "Gabus",
      "area_provinsi": "BALI",
      "area_kota": "BULELENG",
      "size": "140",
      "price": "25000",
      "tgl_parsed": "2020-06-08T10:46:21.374Z",
      "timestamp": "1591587981374"
    },
    {
      "uuid": "kotlin.random.XorWowRandom@ea1ec3b",
      "komoditas": "Bandeng",
      "area_provinsi": "SULAWESI BARAT",
      "area_kota": "MAMUJU UTARA",
      "size": "140",
      "price": "20000",
      "tgl_parsed": "2020-06-08T10:46:21.374Z",
      "timestamp": "1591587981374"
    },
    {
      "uuid": "e776757d-2547-44d8-84fe-1258b5ec945c",
      "komoditas": "Sepat",
      "area_provinsi": "SUMATERA BARAT",
      "area_kota": "PADANG PARIAMAN",
      "size": "130",
      "price": "23000",
      "tgl_parsed": "2020-06-08T10:46:21.374Z",
      "timestamp": "1591587981374"
    },
    {
      "uuid": "a9e10e7d-d385-49b5-ac55-fe6d04f300af",
      "komoditas": "Patin Albino",
      "area_provinsi": "LAMPUNG",
      "area_kota": "LAMPUNG TIMUR",
      "size": "120",
      "price": "20000",
      "tgl_parsed": "2020-06-08T12:14:31.719Z",
      "timestamp": "1591593271719"
    },
    {
      "uuid": "57d8839f-6583-46c9-8e5d-67175363332d",
      "komoditas": "Teri",
      "area_provinsi": "BANTEN",
      "area_kota": "CIREBON",
      "size": "50",
      "price": "90000",
      "tgl_parsed": "2020-06-09T15:08:58.122Z",
      "timestamp": "1591690138122"
    },
  ])

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
    },
    {
      Header: "Per Tanggal",
      accessor: "tgl_parsed",
    },
  ], [])
  const tableInstance = useTable({ columns, data }, useGlobalFilter, useSortBy, usePagination)
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
        <button className="add-btn">Tambah Data</button>
        <TableSearchField 
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </div>
      <div className="table-section">
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
      </div>
    </div>
  )
}

export default MainContent
