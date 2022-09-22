import { useState } from "react";

type Fields = string[];

export const useForm = (...fields: Fields) => {

    const initInputs = (fields: Fields) => {

        const inputs: Record<string, { value: string, status: string, error: Record<string, string> }> = {};

        for (const field of fields) {
            const error = field === 'email' ? { english: "Email can't be empty and must include a '@' sign!", polish: "Email nie może być pusty i musi zawierać znak '@'!" } : { english: "This field can't be empty!", polish: "To pole nie może być puste!" };
            inputs[field] = { value: '', status: 'untouched', error: error };
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
        setInputValues(prevState => ({
            ...prevState,
            [name]: { ...prevState[name], value: value, status: status }
        }));
    };

    return { inputValues, setInputValues, changeHandler }
};