// export const useValidate = (ref: React.MutableRefObject<null | HTMLInputElement | HTMLTextAreaElement>): { value: string, validity: () => (boolean) } => {
//     @ts-ignore
//     const { current: { value, name } } = ref;
//     return true
//     if (name === 'email') {
//         const regEx = /.+@.+\.[A-Za-z]+$/;
//         return (regEx.test(value) && (value.length > 0));
//     } else {
//         return (value.length > 0);
//     };
// };

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