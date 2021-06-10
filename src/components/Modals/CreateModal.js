import React, { useState, useEffect } from 'react'
import { Modal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
import { FaWindowClose, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'
import { CgSpinner } from 'react-icons/cg'
import { InputField } from '..'
import { connect } from 'react-redux';
import { handleCreateData, handleGetDataArea, handleGetDataFish, handleGetDataSize, resetErrorRequest } from '../../redux/actions'
import { v4 as uuid } from 'uuid'

const CreateModal = ({
  isCreateModalOpen,
  setIsCreateModalOpen,
  isRequestSuccess,
  error,
  dataArea,
  dataSize,
  isLoadingComponent,
  isLoadingButton,
  handleGetDataFish,
  handleCreateData,
  handleGetDataArea,
  handleGetDataSize,
  resetErrorRequest
}) => {
  const [newData, setNewData] = useState([{
    uuid: "",
    komoditas: "",
    area_provinsi: "",
    area_kota: "",
    size: "",
    price: "",
    tgl_parsed: "",
    timestamp: ""
  }])

  useEffect(() => {
    dataArea.length === 0 && handleGetDataArea()
    dataSize.length === 0 && handleGetDataSize()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    return (error !== null || isRequestSuccess !== null) && resetErrorRequest()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCreateModalOpen])

  const handleChange = e => {
    const inputedData = {...newData}
    inputedData[e.target.name] = e.target.value
    setNewData(inputedData)
  }

  const handleSubmit = e => {
    e.preventDefault()
    newData.uuid = uuid()
    newData.tgl_parsed = new Date().toISOString()
    newData.timestamp = new Date().getTime()
    handleCreateData([newData])
  }
  
  const closeModal = () => {
    (error !== null || isRequestSuccess) && handleGetDataFish()
    setIsCreateModalOpen(false)
  }

  return (
    <Modal
      open={isCreateModalOpen}
      onClose={closeModal}
      center
      showCloseIcon={false}
    >
      <div className="modal edit-modal">
        <div className="modal-title edit-modal-title">
          <div className="title-text">Tambah Data Baru</div>
          <button onClick={closeModal} className="close-modal">
            <FaWindowClose size={24} />
          </button>
        </div>
        <div className="modal-body">
          {
            isRequestSuccess ? 
            <div className="text-wrapper">
              <FaCheckCircle size={48} />
              <p>Data Berhasil Ditambahkan!</p>
            </div> :
            error !== null ?
            <div className="text-wrapper">
              <FaTimesCircle size={48} />
              <p>Terjadi Kesalahan!</p>
            </div> :
            <form>
              <InputField label="Komoditas" type="text" placeholder="Masukan Komoditas" name="komoditas" onChange={handleChange} />
              <div className="select-field">
                <label htmlFor="province">Provinsi</label>
                <select id="province" name="area_provinsi" onChange={handleChange}>
                  <option defaultChecked value="" >
                    { isLoadingComponent ? 'Memuat...' : 'Pilih Provinsi'}
                  </option>
                  {dataArea.map(area => <option>{area.province}</option>)}
                </select>
              </div>
              <div className="select-field">
                <label htmlFor="city">Kab/Kota</label>
                <select id="city" name="area_kota" onChange={handleChange}>
                  <option defaultChecked value="">
                    { isLoadingComponent ? 'Memuat...' : 'Pilih Kab/Kota'}
                  </option>
                  {dataArea.map(area => <option>{area.city}</option>)}
                </select>
              </div>
              <div className="select-field">
                <label htmlFor="size">Ukuran</label>
                <select id="size" name="size" onChange={handleChange}>
                  <option defaultChecked value="">
                    { isLoadingComponent ? 'Memuat...' : 'Pilih Ukuran'}
                  </option>
                  {dataSize.map(item => <option>{item.size}</option>)}
                </select>
              </div>
              <InputField label="Harga dalam Rupiah" type="number" placeholder="Masukan Harga" name="price" onChange={handleChange}/>
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
    handleCreateData: newData => dispatch(handleCreateData(newData)),
    handleGetDataFish: () => dispatch(handleGetDataFish()),
    handleGetDataArea: () => dispatch(handleGetDataArea()),
    handleGetDataSize: () => dispatch(handleGetDataSize()),
    resetErrorRequest: () => dispatch(resetErrorRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateModal)
