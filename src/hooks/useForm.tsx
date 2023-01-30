import { useState } from "react";
import { useValidate } from './useValidate';

type Fields = string[];

type InputsData = Record<string, {
    value: string;
    status: string;
    error: Record<string, string>;
}>;

type ReturnType = {
    inputValues: InputsData,
    setInputValues: React.Dispatch<React.SetStateAction<InputsData>>,
    changeHandler: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
};

export const useForm = (...fields: Fields): ReturnType => {

    const { validate } = useValidate();

    const initInputs = (fields: Fields) => {

        const inputs: InputsData = {};

        for (const field of fields) {
            const error = field === 'user_email' ?
                { english: "Email can't be empty and must include a '@' sign!", polish: "Email nie może być pusty i musi zawierać znak '@'!" } :
                { english: "This field can't be empty!", polish: "To pole nie może być puste!" };
            inputs[field] = { value: '', status: 'untouched', error: error };
        };
        return inputs;
    };

    const [inputValues, setInputValues] = useState(() => initInputs(fields));

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const status = validate({ name: name, value: value }) ? 'valid' : 'error';
        setInputValues(prevState => ({
            ...prevState,
            [name]: { ...prevState[name], value: value, status: status }
        }));
    };

    return { inputValues, setInputValues, changeHandler };
};