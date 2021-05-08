import express from 'express';
// controllers
import location from '../controllers/location.js';

const router = express.Router();

router
  .get('/', location.onGetAllLocations)
  .post('/', location.onCreateLocation)
  .get('/:id', location.onGetLocationById)
  .delete('/:id', location.onDeleteLocationById)
  .delete('/', location.onDeleteAllLocations)
export default router;