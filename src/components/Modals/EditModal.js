import React, { useState, useEffect } from 'react'
import { Modal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
import { FaWindowClose, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'
import { CgSpinner } from 'react-icons/cg'
import { connect } from 'react-redux'
import { InputField } from '..'
import { handleEditData, handleGetDataArea, handleGetDataFish, handleGetDataSize, resetErrorRequest } from '../../redux/actions'

const EditModal = ({
  isEditModalOpen,
  setIsEditModalOpen,
  selectedItem,
  isRequestSuccess,
  error,
  dataArea,
  dataSize,
  isLoadingComponent,
  isLoadingButton,
  handleGetDataFish,
  handleEditData,
  handleGetDataArea,
  handleGetDataSize,
  resetErrorRequest
}) => {
  const [edittedData, setEdittedData] = useState([{
    uuid: "",
    komoditas: "",
    area_provinsi: "",
    area_kota: "",
    size: "",
    price: "",
    tgl_parsed: "",
    timestamp: ""
  }])
  const [submitData] = useState({
    condition: {
        uuid: ""
    }, 
    set: {}
  })

  useEffect(() => {
    dataArea.length === 0 && handleGetDataArea()
    dataSize.length === 0 && handleGetDataSize()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setEdittedData(selectedItem)
  }, [selectedItem])

  useEffect(() => {
    return (error !== null || isRequestSuccess !== null) && resetErrorRequest()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditModalOpen])

  const handleChange = e => {
    const inputedData = {...edittedData}
    inputedData[e.target.name] = e.target.value
    setEdittedData(inputedData)
  }

  const handleSubmit = e => {
    e.preventDefault()
    edittedData.tgl_parsed = new Date().toISOString()
    edittedData.timestamp = new Date().getTime()
    submitData.condition.uuid = selectedItem.uuid
    submitData.set = edittedData
    handleEditData(submitData)
  }

  const closeModal = () => {
    (error !== null || isRequestSuccess) && handleGetDataFish()
    setIsEditModalOpen(false)
    setEdittedData(selectedItem)
  }
  return (
    <Modal
      open={isEditModalOpen}
      onClose={closeModal}
      center
      showCloseIcon={false}
    >
      <div className="modal edit-modal">
        <div className="modal-title edit-modal-title">
          <div className="title-text">Edit {selectedItem.komoditas} - {selectedItem.area_kota}</div>
          <button onClick={closeModal} className="close-modal">
            <FaWindowClose size={24} />
          </button>
        </div>
        <div className="modal-body">
        {
            isRequestSuccess ? 
            <div className="text-wrapper">
              <FaCheckCircle size={48} />
              <p>Data Berhasil Diperbarui!</p>
            </div> :
            error !== null ?
            <div className="text-wrapper">
              <FaTimesCircle size={48} />
              <p>Terjadi Kesalahan!</p>
            </div> :
            <form>
              <InputField label="Komoditas" type="text" placeholder="Masukan Komoditas" name="komoditas" onChange={handleChange} value={edittedData.komoditas} />
              <div className="select-field">
                <label htmlFor="province">Provinsi</label>
                <select id="province" name="area_provinsi" onChange={handleChange}>
                  <option defaultChecked value={edittedData.area_provinsi}>
                    { isLoadingComponent ? "Memuat..." : edittedData.area_provinsi }
                  </option>
                  {dataArea.map(area => <option>{area.province}</option>)}
                </select>
              </div>
              <div className="select-field">
                <label htmlFor="city">Kab/Kota</label>
                <select id="city" name="area_kota" onChange={handleChange}>
                  <option defaultChecked value={edittedData.area_kota}>
                    { isLoadingComponent ? "Memuat..." : edittedData.area_kota }
                  </option>
                  {dataArea.map(area => <option>{area.city}</option>)}
                </select>
              </div>
              <div className="select-field">
                <label htmlFor="size">Ukuran</label>
                <select id="size" name="size" onChange={handleChange}>
                  <option defaultChecked value={edittedData.size}>
                    { isLoadingComponent ? "Memuat..." : edittedData.size }
                  </option>
                  {dataSize.map(item => <option>{item.size}</option>)}
                </select>
              </div>
              <InputField label="Harga dalam Rupiah" type="number" placeholder="Masukan Harga" name="price" onChange={handleChange} value={edittedData.price} />
              <div className="btn-group">
                <button 
                  className="confirm-edit-btn"
                  disabled={isLoadingButton}
                  onClick={handleSubmit}
                >
                  { isLoadingButton ? <CgSpinner className="loading-btn" size={24} /> : "Simpan" }
                </button>
              </div>
            </form>
          }
        </div>
      </div>
    </Modal>
  )
}

const mapStateToProps = state => {
  return {
    isRequestSuccess: state.isRequestSuccess,
    error: state.error,
    dataArea: state.dataArea,
    dataSize: state.dataSize,
    isLoadingComponent: state.isLoadingComponent,
    isLoadingButton: state.isLoadingButton
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleEditData: newData => dispatch(handleEditData(newData)),
    handleGetDataFish: () => dispatch(handleGetDataFish()),
    handleGetDataArea: () => dispatch(handleGetDataArea()),
    handleGetDataSize: () => dispatch(handleGetDataSize()),
    resetErrorRequest: () => dispatch(resetErrorRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditModal)
