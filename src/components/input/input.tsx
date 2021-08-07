import { Input } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { FC } from 'react'
import { TIcons } from 'types/types'

interface ICustomInput {
  icon?: TIcons;
  name?: string;
  type: 'text' | 'password' | 'email';
  placeholder: string;
  value: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  disabled?: boolean;
}

const CustomInput: FC<ICustomInput> = ({ icon, name, type, placeholder, value, onChange, disabled }) => {
  const [isDisabled, setDisabled] = React.useState(true)

  const onBlur = () => {
    setDisabled(true)
  }
  const onClick = () => {
    setDisabled(false)
  }

  return (
    <Input
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
  )
}

export default CustomInput
