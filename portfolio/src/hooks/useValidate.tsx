type MyParams = {
    type: string,
    value: string
};

export const useValidate = (): { validate: ({ type, value }: MyParams) => boolean } => {


    const validate = ({ type, value }: MyParams) => {
        if (type === 'email') {
            const regEx = /.+@.+\.[A-Za-z]+$/;
            return (regEx.test(value) && (value.length > 0));
        } else {
            return (value.length > 0);
        };
    };

    return { validate }

};