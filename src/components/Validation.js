import React from "react";

export function renderLabel(
  name,
  label,
  required,
  errorMsgId,
  errorState1,
  errorMsg1,
  errorState2,
  errorMsg2
) {
  return (
    <div className="labelRow">
      <label htmlFor={name}>
        {label}
        {required ? " *" : ""}
      </label>
      <div
        className="errorText"
        id={errorMsgId}
        hidden={!errorState1 && !errorState2}
      >
        <span>
          {errorState1
            ? errorMsg1
              ? errorMsg1
              : required
              ? "This is a required field."
              : ""
            : ""}
          &nbsp;
        </span>
        <span>{errorState2 ? errorMsg2 : ""}&nbsp;</span>
      </div>
    </div>
  );
}

export function renderInputField(type, name, value, onChange, placeholder, maxLength, onInput) {
  return (
    <span className="baseFieldContainer">
      <input
        className="baseField"
        type={type}
        id={name}
        name={name}
        onInput={onInput}
        placeholder={placeholder}
        maxLength={maxLength}
        value={value || ""}
        onChange={onChange}
      />
    </span>
  );
}

export function ValidateFieldNotEmpty(fieldName) {
  const value = document.getElementById(fieldName).value;
  return value.length !== 0;
}

export function ValidateName(fieldName) {
  const name = document.getElementById(fieldName).value;
  if (name === undefined) {
    return false;
  }
  if (name.length === 0 || !/\d+/.test(name)) {
    return true;
  }
  return false;
}

export function ValidateZipCode(fieldName) {
  const zipCode = document.getElementById(fieldName).value;
  if (zipCode === undefined) {
    return false;
  }
  if (zipCode.length === 0 || /^\d+$/.test(zipCode)) {
    return true;
  }
  return false;
}
