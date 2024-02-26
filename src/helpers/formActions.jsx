export const validateForm = (
  formData = {},
  requiredFields = Object.keys(formData),
  errorCallback = () => {
    alert('Fill the required fields');
  }
) => {
  const isEmpty = requiredFields.some((field) => !formData[field]);
  if (isEmpty) {
    errorCallback();
    return false;
  }
  return true;
};

export const generateRandomString = (length = 8) => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};
