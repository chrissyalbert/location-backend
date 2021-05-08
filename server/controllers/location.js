// utils
import makeValidation from '@withvoid/make-validation';
// models
import LocationModel from '../models/Location.js';

export default {
  onGetAllLocations: async (req, res) => {
    try {
      const locations = await LocationModel.getLocations();
      return res.status(200).json({ success: true, locations });
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
   },
  onGetLocationById: async (req, res) => { 
    try {
      const location = await LocationModel.getLocationById(req.params.id);
      return res.status(200).json({ success: true, location });
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  },
  onCreateLocation: async (req, res) => { 
    try {
      const validation = makeValidation(types => ({
        payload: req.body,
        checks: {
          latitude: { type: types.string },
          longitude: { type: types.string },
        }
      }));
      if (!validation.success) return res.status(400).json(validation);

      const { latitude, longitude } = req.body;
      const location = await LocationModel.createLocation(latitude, longitude);
      return res.status(200).json({ success: true, location });
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  },
  onDeleteLocationById: async (req, res) => { 
    try {
      const location = await LocationModel.deleteLocationById(req.params.id);
      return res.status(200).json({ 
        success: true, 
        message: `Deleted a count of ${location.deletedCount} user.` 
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  },
  onDeleteAllLocations: async (req, res) => { 
    try {
      const location = await LocationModel.deleteAllLocations();
      return res.status(200).json({ 
        success: true, 
        message: `Deleted a count of ${location.deletedCount} user(s).` 
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  },
}