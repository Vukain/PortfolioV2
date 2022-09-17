import { useState } from "react";

type Fields = string[];

export const useForm = (...fields: Fields) => {

    const initInputs = (fields: Fields) => {

        const inputs: Record<string, { value: string, status: string }> = {};

        for (const field of fields) {
            inputs[field] = { value: '', status: 'untouched' };
        };

        return inputs;
    }

    const [inputValues, setInputValues] = useState(() => initInputs(fields));

    const validate = (name: string, value: string): boolean => {

        const hasLength = value.trim().length > 0;

        if (name === 'email') {
            const regEx = /.+@.+\.[A-Za-z]+$/;
            return (regEx.test(value) && hasLength);
        } else {
            return hasLength;
        };
    };

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const status = validate(name, value) ? 'valid' : 'error';
        setInputValues({
            ...inputValues,
            [name]: { value: value, status: status }
        });
    };

    return { inputValues, changeHandler }
};