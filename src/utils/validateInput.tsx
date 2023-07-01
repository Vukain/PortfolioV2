type MyParams = {
  name: string;
  value: string;
};

export const validateInput = ({ name, value }: MyParams) => {
  // Test if not empty and if value is a proper email
  const hasLength = value.trim().length > 0;
  const emailRegEx = /.+@.+\.[A-Za-z]+$/;

  return hasLength && name === 'user_email' ? emailRegEx.test(value) : true;
};
