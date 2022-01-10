const fieldChangeHandler = (e, handleChange, backendErrors, setBackendErrors) => {
    let name = e.target.name
    let {[name]: fieldName, ...rest} = backendErrors;
    setBackendErrors(rest);
    handleChange(e);
}

export default fieldChangeHandler;