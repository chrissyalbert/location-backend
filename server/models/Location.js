import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const locationSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4().replace(/\-/g, ""),
    },
    latitude: String,
    longitude: String
  },
  {
    timestamps: true,
    collection: "locations",
  }
);

locationSchema.statics.createLocation = async function (
	latitude,
  longitude
) {
  try {
    const location = await this.create({ latitude, longitude });
    return location;
  } catch (error) {
    throw error;
  }
}

locationSchema.statics.getLocationById = async function (id) {
  try {
    const location = await this.findOne({ _id: id });
    if (!location) throw ({ error: 'No location with this id found' });
    return location;
  } catch (error) {
    throw error;
  }
}

locationSchema.statics.getLocations = async function () {
  try {
    const locations = await this.find();
    return locations;
  } catch (error) {
    throw error;
  }
}

locationSchema.statics.getLocationsByIds = async function (ids) {
  try {
    const locations = await this.find({ _id: { $in: ids } });
    return locations;
  } catch (error) {
    throw error;
  }
}

locationSchema.statics.deleteLocationById = async function (id) {
  try {
    const result = await this.remove({ _id: id });
    return result;
  } catch (error) {
    throw error;
  }
}

locationSchema.statics.deleteAllLocations = async function () {
  try {
    const result = await this.deleteMany({ latitude: { $ne: 0 }, longitude: { $ne: 0 } });
    return result;
  } catch (error) {
    throw error;
  }
}

export default mongoose.model("Location", locationSchema);