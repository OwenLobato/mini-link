export const validateForm = (
  formData = {},
  requiredFields = Object.keys(formData)
) => {
  const isEmpty = requiredFields.some((field) => !formData[field]);
  if (isEmpty) {
    // TODO: Add modal
    alert('Please fill all required fields');
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
