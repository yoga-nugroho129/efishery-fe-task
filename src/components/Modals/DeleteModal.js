import React, { useState, useEffect } from 'react'
import { Modal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
import { FaWindowClose, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'
import { CgSpinner } from 'react-icons/cg'
import { connect } from 'react-redux'
import { handleGetDataFish, handleDeleteData, resetErrorRequest } from '../../redux/actions'

const DeleteModal = ({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  selectedItem,
  isLoadingButton,
  isRequestSuccess,
  error,
  handleGetDataFish,
  handleDeleteData,
  resetErrorRequest
}) => {
  const [deleteItem, setDeleteItem] = useState({})

  useEffect(() => {
    return (error !== null || isRequestSuccess !== null) && resetErrorRequest()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeleteModalOpen])

  useEffect(() => {
    setDeleteItem({ condition: { uuid: selectedItem.uuid }})
  }, [selectedItem])

  const closeModal = () => {
    (error !== null || isRequestSuccess) && handleGetDataFish()
    setIsDeleteModalOpen(false)
  }

  return (
    <Modal
      open={isDeleteModalOpen}
      onClose={closeModal}
      center
      showCloseIcon={false}
    >
      <div className="modal delete-modal">
        <div className="modal-title delete-modal-title">
          <div className="title-text">Hapus Data</div>
          <button onClick={closeModal} className="close-modal">
            <FaWindowClose size={24} />
          </button>
        </div>
        <div className="modal-body">
          {
            isRequestSuccess ? 
              <div className="text-wrapper">
                <FaCheckCircle size={48} />
                <p>Hapus Data Berhasil!</p>
              </div> :
              error !== null ?
              <div className="text-wrapper">
                <FaTimesCircle size={48} />
                <p>Terjadi Kesalahan!</p>
              </div> :
              <>
                <div className="text-wrapper">
                  <b>Apakah Anda Yakin</b>
                  <br />
                  <div>Akan menghapus data <br /> <b>{selectedItem.komoditas} - {selectedItem.area_kota}</b>?</div>
                </div>
                <div className="btn-group">
                  <button 
                    className="cancel-delete-btn"
                    onClick={() => setIsDeleteModalOpen(false)}
                  >
                    Kembali
                  </button>
                  <button 
                    className="confirm-delete-btn"
                    disabled={isLoadingButton}
                    onClick={() => handleDeleteData(deleteItem)}
                  >
                    { isLoadingButton ? <CgSpinner className="loading-btn" size={24} /> : "Hapus" }
                  </button>
                </div>
              </>

          }
        </div>
      </div>
    </Modal>
  )
}

const mapStateToProps = state => {
  return {
    isLoadingButton: state.isLoadingButton,
    isRequestSuccess: state.isRequestSuccess,
    error: state.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleGetDataFish: () => dispatch(handleGetDataFish()),
    handleDeleteData: item => dispatch(handleDeleteData(item)),
    resetErrorRequest: () => dispatch(resetErrorRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteModal)
