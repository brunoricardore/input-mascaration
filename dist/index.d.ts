import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    mask: string | string[];
    beforeMask?: (state: string) => string;
    onValueChanged: (value: string) => void;
    maskChar?: string;
}
declare const InputMask: React.FC<InputProps>;

export { InputMask };
