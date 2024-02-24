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
