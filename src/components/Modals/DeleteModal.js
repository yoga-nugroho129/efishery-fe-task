import React from 'react'
import { Modal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
import { FaWindowClose } from 'react-icons/fa'

const DeleteModal = ({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  selectedItem
}) => {
  return (
    <Modal
      open={isDeleteModalOpen}
      onClose={() => setIsDeleteModalOpen(false)}
      center
      showCloseIcon={false}
    >
      <div className="modal delete-modal">
        <div className="modal-title delete-modal-title">
          <div className="title-text">Delete Data</div>
          <button onClick={() => setIsDeleteModalOpen(false)} className="close-modal">
            <FaWindowClose size={24} />
          </button>
        </div>
        <div className="modal-body">
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
              // disabled={isLoadingButton}
              // onClick={() => handleDeleteAssignment(programId, selectedAssignment.id)}
            >
              {/* { isLoadingButton ? <CgSpinner className="animate-spin block mx-auto text-xl" size={24} /> : "Delete" } */}
              Hapus
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteModal
