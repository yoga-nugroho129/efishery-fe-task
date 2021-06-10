import React from 'react'

const InputField = ({
  label,
  type,
  placeholder,
  value
}) => {
  return (
    <div className="input-field">
      <label>{label}</label>
      <input type={type} placeholder={placeholder} value={value} />
    </div>
  )
}

export default InputField
