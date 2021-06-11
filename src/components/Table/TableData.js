import React from 'react'
import { FaCaretSquareDown, FaCaretSquareUp } from 'react-icons/fa';

const TableData = ({
  getTableProps,
  headerGroups,
  getTableBodyProps,
  tableDataValues,
  page,
  prepareRow
}) => {
  return (
    <table 
      {...getTableProps()}
    >
      <thead>
        {
          headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {
                headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())} >
                    <div>
                      {column.render('Header')}
                      <span>
                        {
                          column.isSorted
                            ? column.isSortedDesc
                              ? <FaCaretSquareDown />
                              : <FaCaretSquareUp />
                            : ""
                        }
                      </span>
                    </div>
                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                  </th>
                ))
              }
            </tr>
          ))
        }
      </thead>
      <tbody {...getTableBodyProps()}>
        {
          tableDataValues.length !== 0 ? 
            page.map(row => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()} >
                  {
                    row.cells.map(cell => {
                      return (
                        <td {...cell.getCellProps()} >
                          {cell.render('Cell')}
                        </td>
                      )
                    })
                  }
                </tr>
              )
            }) :
            <tr className="img-container my-10 md:my-20">
              <td colSpan="5" className="py-8">
                {/* <img src={NoData} alt="No Data" className="mx-auto max-h-48"/> */}
                <div className="text-base font-light text-gray-400 mt-4 text-center">
                  Oops! No Data Found.
                </div>
              </td>
            </tr>
        }
      </tbody>
    </table>
  );
}

export default TableData
