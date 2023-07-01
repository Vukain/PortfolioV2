import { useState } from 'react';
import { validateInput } from '../utils/validateInput';

type Fields = string[];

type InputsData = Record<
  string,
  {
    value: string;
    status: string;
    error: Record<string, string>;
  }
>;

export const useForm = (...fields: Fields) => {
  const initInputs = (fields: Fields) => {
    const inputs: InputsData = {};

    for (const field of fields) {
      const error =
        field === 'user_email'
          ? {
              english: "Email can't be empty and must include a '@' sign!",
              polish: "Email nie może być pusty i musi zawierać znak '@'!",
            }
          : { english: "This field can't be empty!", polish: 'To pole nie może być puste!' };
      inputs[field] = { value: '', status: 'untouched', error: error };
    }
    return inputs;
  };

  const [inputValues, setInputValues] = useState(() => initInputs(fields));

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const status = validateInput({ name: name, value: value }) ? 'valid' : 'error';
    setInputValues((prevState) => ({
      ...prevState,
      [name]: { ...prevState[name], value: value, status: status },
    }));
  };

  return { inputValues, setInputValues, changeHandler };
};
