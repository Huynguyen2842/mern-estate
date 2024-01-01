import express from 'express';
import { test } from '../Controllers/user.controller.js';

const router = express.Router();

// Define a route for the "/test" endpoint
router.get('/test', test);
export default router;