import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;

const isValidObjectId = (id) => {
  return (
    (id instanceof ObjectId || typeof id === 'string') && ObjectId.isValid(id)
  );
};

const convertToObjectId = (id) => {
  if (id instanceof ObjectId) return id;
  if (typeof id === 'string') return new ObjectId(id);
  throw new Error('Invalid input type, must be ObjectId or string');
};

export const objectIdConversor = (id) => {
  if (isValidObjectId(id)) {
    return convertToObjectId(id);
  } else {
    throw new Error('Invalid ObjectId or string');
  }
};
