import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import PropTypes from 'prop-types';

// хук для фокуса окна при разблокировке
const useFocus = () => {
    const htmlElRef = React.useRef(null)
    const setFocus = () => { htmlElRef.current && htmlElRef.current.focus() }

    return [htmlElRef, setFocus]
}

const CustomInput = ({ icon, name, type, placeholder, value, onChange, disabled }) => {
    const [inputRef, setInputFocus] = useFocus()
    const [isDisabled, setDisabled] = React.useState(true)

    const onBlur = () => {
        setDisabled(true)
    }
    const onClick = () => {
        setDisabled(false)
        setTimeout(() => setInputFocus(), 0)
    }

    return (
        <Input
            ref={inputRef}
            icon={icon}
            name={name}
            disabled={disabled ?? isDisabled}
            type={type}
            placeholder={placeholder}
            value={value}
            onBlur={onBlur}
            onIconClick={onClick}
            onChange={onChange}
        />
    );
}

export default CustomInput;

CustomInput.propTypes = {
    icon: PropTypes.string,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired
}