import React from 'react'
import { FaSearch } from 'react-icons/fa'

const TableSearchField = ({
  globalFilter,
  setGlobalFilter
}) => {
  return (
    <div className="search-field">
      <input 
        type="text"
        placeholder="Cari"
        value={globalFilter || ""}
        onChange={e => setGlobalFilter(e.target.value)}
        className="search-input"
      />
      <span>
        <FaSearch className="search-icon" />
      </span>
    </div>
  )
}

export default TableSearchField