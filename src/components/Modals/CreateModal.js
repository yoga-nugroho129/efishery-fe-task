import React, { useState, useEffect } from 'react'
import { Modal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
import { FaWindowClose } from 'react-icons/fa'
import { InputField } from '..'
import { connect } from 'react-redux';
import { handleGetDataArea, handleGetDataSize } from '../../redux/actions'

const CreateModal = ({
  isCreateModalOpen,
  setIsCreateModalOpen,
  dataArea,
  dataSize,
  isLoadingComponent,
  handleGetDataArea,
  handleGetDataSize
}) => {
  const [areaList, setAreaList] = useState([])
  const [sizeList, setSizeList] = useState([])

  useEffect(() => {
    dataArea.length === 0 && handleGetDataArea()
    dataSize.length === 0 && handleGetDataSize()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    dataArea.length > 0 && setAreaList(dataArea)
  }, [dataArea])

  useEffect(() => {
    dataSize.length > 0 && setAreaList(dataSize)
  }, [dataSize])
  
  const closeModal = e => {
    e.preventDefault()
    setIsCreateModalOpen(false)
  }

  return (
    <Modal
      open={isCreateModalOpen}
      onClose={() => setIsCreateModalOpen(false)}
      center
      showCloseIcon={false}
    >
      <div className="modal edit-modal">
        <div className="modal-title edit-modal-title">
          <div className="title-text">Tambah Data Baru</div>
          <button onClick={() => setIsCreateModalOpen(false)} className="close-modal">
            <FaWindowClose size={24} />
          </button>
        </div>
        <div className="modal-body">
          <form>
            <InputField label="Komoditas" type="text" placeholder="Masukan Komoditas" name="komoditas" />
            <div className="select-field">
              <label htmlFor="province">Provinsi</label>
              <select name="province" id="province">
                <option defaultChecked value="">
                  { isLoadingComponent ? 'Memuat...' : 'Pilih Provinsi'}
                </option>
                {areaList.map(area => <option>{area.province}</option>)}
              </select>
            </div>
            <div className="select-field">
              <label htmlFor="city">Kab/Kota</label>
              <select name="city" id="city">
                <option defaultChecked value="">
                  { isLoadingComponent ? 'Memuat...' : 'Pilih Kab/Kota'}
                </option>
                {areaList.map(area => <option>{area.city}</option>)}
              </select>
            </div>
            <div className="select-field">
              <label htmlFor="size">Ukuran</label>
              <select name="size" id="size">
                <option defaultChecked value="">
                  { isLoadingComponent ? 'Memuat...' : 'Pilih Ukuran'}
                </option>
                {dataSize.map(item => <option>{item.size}</option>)}
              </select>
            </div>
            <InputField label="Harga dalam Rupiah" type="number" placeholder="Masukan Harga" />
            <div className="btn-group">
              <button 
                className="cancel-edit-btn"
                onClick={closeModal}
              >
                Kembali
              </button>
              <button 
                className="confirm-edit-btn"
                // disabled={isLoadingButton}
                // onClick={() => handleDeleteAssignment(programId, selectedAssignment.id)}
              >
                {/* { isLoadingButton ? <CgSpinner className="animate-spin block mx-auto text-xl" size={24} /> : "Delete" } */}
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  )
}

const mapStateToProps = state => {
  return {
    dataArea: state.dataArea,
    dataSize: state.dataSize,
    isLoadingComponent: state.isLoadingComponent
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleGetDataArea: () => dispatch(handleGetDataArea()),
    handleGetDataSize: () => dispatch(handleGetDataSize()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateModal)
