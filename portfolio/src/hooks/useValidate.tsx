type MyParams = {
    name: string,
    value: string
};

export const useValidate = () => {

    const validate = ({ name, value }: MyParams): boolean => {

        const hasLength = value.trim().length > 0;

        if (name === 'email') {
            const regEx = /.+@.+\.[A-Za-z]+$/;
            return (regEx.test(value) && hasLength);
        } else {
            return hasLength;
        };
    };

    return { validate }

};