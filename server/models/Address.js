import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide the name'],
      unique: true,
    },
    urlCode: {
      type: String,
      required: [true, 'Please provide the url code'],
      unique: true,
    },
    originalLink: {
      type: String,
      required: [true, 'Please provide the original link'],
      unique: true,
    },
    description: {
      type: String,
      default: '',
      required: false,
    },
    visitCount: {
      type: Number,
      default: 0,
      required: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Please provide the id of the user'],
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

const Address = mongoose.model('address', addressSchema);
export default Address;
