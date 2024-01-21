import Address from '../../models/Address.js';
import { objectIdConversor } from '../helpers/dbConverters.js';

export const getAllAddresses = async () => {
  try {
    const allAddresses = await Address.find({});
    return allAddresses;
  } catch (error) {
    throw new Error('Error finding URLs');
  }
};

export const findAddressBy = async (key, value, onlyOne = false) => {
  try {
    const filter =
      key === '_id' || key === 'createdBy'
        ? { [key]: objectIdConversor(value) }
        : { [key]: value };
    const address = onlyOne
      ? await Address.findOne(filter)
      : await Address.find(filter);
    return address;
  } catch (error) {
    throw new Error('Error finding URL');
  }
};
