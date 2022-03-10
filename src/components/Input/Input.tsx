import React, { InputHTMLAttributes, useState } from 'react'
import {formatter} from 'mascaration';
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  mask: string | string[]
  beforeMask?: (state: string) => string;
}

const InputMask: React.FC<InputProps> = (props) => {

  const [state, setState] = useState<string>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const eventValue = event.target.value;
    let formattedValue = '';

    if (props.beforeMask) {
      formattedValue = props.beforeMask(eventValue);
    }

    formattedValue = formatter(props.mask, eventValue);
    setState(formattedValue);
  }

  return (
    <input value={state} onChange={handleChange} />
  )
}

export default InputMask;