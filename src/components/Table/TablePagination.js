import React from 'react';

const TablePagination = ({
  pageIndex,
  pageOptions,
  gotoPage,
  previousPage,
  nextPage,
  canPreviousPage,
  canNextPage,
  pageCount
}) => {
  return (
    <div className="table-pagination">
      <hr />
        <div className="pagination-btn">
          <div className="page-controller">
            Page <span>{pageIndex + 1} of {pageOptions.length}</span>
            <span> | Go to Page 
              <input 
                type="number" 
                defaultValue={pageIndex + 1} 
                onChange={e => {
                  const pageNumber = e.target.value && Number(e.target.value) - 1;
                  gotoPage(pageNumber);
                }}
              />
            </span>
          </div>
          <div className="btn-group">
            <button 
              onClick={() => gotoPage(0)} 
              disabled={!canPreviousPage} 
            >
              {"<<"}
            </button>
            <button 
              onClick={() => previousPage()} 
              disabled={!canPreviousPage} 
            >
              Prev
            </button>
            <button 
              onClick={() => nextPage()} 
              disabled={!canNextPage} 
            >
              Next
            </button>
            <button 
              onClick={() => gotoPage(pageCount - 1)} 
              disabled={!canNextPage} 
            >
              {">>"}
            </button>
          </div>
        </div>
    </div>
  )
}

export default TablePagination;
