import React, { FocusEvent, FocusEventHandler, InputHTMLAttributes, useEffect, useRef, useState } from "react";
import { formatter, unmask } from "mascaration";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  mask: string | string[];
  beforeMask?: (state: string) => string;
  onValueChanged: (value: string) => void;
  maskChar?: string;
}

export interface InputState {
  rawValue: string;
  value: string;
  position: {
    start: number;
    end: number;
  };
}

const InputMask: React.FC<InputProps> = (props) => {
  const [state, setState] = useState<InputState>({
    position: { start: 1, end: 1 },
    rawValue: "",
    value: "",
  });
  const inputRef = useRef<any>(null);

  useEffect(() => {
    if (props.value) {
      setState({
        ...state,
        rawValue: props.value.toString(),
        value: formatter(props.mask, props.value.toString()),
      });
    }
  }, []);

  useEffect(() => {
    const pos = calculateCursorPosition();
    inputRef.current.setSelectionRange(pos, pos);
  }, [state]);

  const calculateCursorPosition = (): number => {
    return state.value.search(new RegExp(`${props.maskChar || "#"}`));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    const eventValue = event.target.value;
    const rawValue = unmask(eventValue);
    let formattedValue = "";

    if (props.beforeMask) {
      formattedValue = props.beforeMask(rawValue);
    }
    formattedValue = formatter(props.mask, rawValue);

    console.log({
      ...state,
      rawValue,
      value: formattedValue,
    });
    

    setState({
      ...state,
      rawValue,
      value: formattedValue,
    });
    props.onValueChanged(formattedValue);
  };

  return (
    <input
      ref={inputRef}
      value={state.value}
      onChange={handleChange}
    />
  );
};

export default InputMask;
