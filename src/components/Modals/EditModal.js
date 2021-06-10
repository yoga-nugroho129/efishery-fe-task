import React, { useState } from 'react'
import { Modal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
import { FaWindowClose } from 'react-icons/fa'
import { InputField } from '..'

const EditModal = ({
  isEditModalOpen,
  setIsEditModalOpen,
  selectedItem
}) => {
  const [areaList, setAreaList] = useState([
    {
      "province": "ACEH",
      "city": "ACEH KOTA"
    },
    {
      "province": "BALI",
      "city": "BULELENG"
    },
    {
      "province": "BANTEN",
      "city": "PANDEGLANG"
    },
    {
      "province": "DKI JAKARTA",
      "city": "KOTA TUA"
    },
    {
      "province": "JAWA BARAT",
      "city": "BANDUNG"
    },
  ])
  const [sizeList, setSizeList] = useState([
    { size: "30" },
    { size: "40" },
    { size: "50" },
    { size: "60" },
    { size: "70" },
    { size: "80" },
    { size: "90" },
    { size: "100" },
    { size: "110" },
  ])
  const closeModal = e => {
    e.preventDefault()
    setIsEditModalOpen(false)
  }
  return (
    <Modal
      open={isEditModalOpen}
      onClose={() => setIsEditModalOpen(false)}
      center
      showCloseIcon={false}
    >
      <div className="modal edit-modal">
        <div className="modal-title edit-modal-title">
          <div className="title-text">Edit {selectedItem.komoditas} - {selectedItem.area_kota}</div>
          <button onClick={() => setIsEditModalOpen(false)} className="close-modal">
            <FaWindowClose size={24} />
          </button>
        </div>
        <div className="modal-body">
          <form>
            <InputField label="Komoditas" type="text" placeholder="Masukan Komoditas" value={selectedItem.komoditas} />
            <div className="select-field">
              <label htmlFor="province">Provinsi</label>
              <select name="province" id="province">
                <option defaultChecked={selectedItem.area_provinsi} value={selectedItem.area_provinsi}>{selectedItem.area_provinsi}</option>
                {areaList.map(area => <option>{area.province}</option>)}
              </select>
            </div>
            <div className="select-field">
              <label htmlFor="city">Kab/Kota</label>
              <select name="city" id="city">
                <option defaultChecked={selectedItem.area_kota} value={selectedItem.area_kota}>{selectedItem.area_kota}</option>
                {areaList.map(area => <option>{area.city}</option>)}
              </select>
            </div>
            <div className="select-field">
              <label htmlFor="size">Ukuran</label>
              <select name="size" id="size">
                <option defaultChecked={selectedItem.size} value={selectedItem.size}>{selectedItem.size}</option>
                {sizeList.map(area => <option>{area.size}</option>)}
              </select>
            </div>
            <InputField label="Harga dalam Rupiah" type="number" placeholder="Masukan Harga" value={selectedItem.price} />
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

export default EditModal
