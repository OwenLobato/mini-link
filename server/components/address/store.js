import Address from '../../models/Address.js';

export const getAllAddresses = async () => {
  try {
    const allAddresses = await Address.find({});
    return allAddresses;
  } catch (error) {
    throw new Error('Error finding URLs');
  }
};
