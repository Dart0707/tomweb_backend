import express from 'express';
import { generateApiKey } from '../utils/generateKey.js';
import { storeApiKey } from '../middleware/authMiddleware.js';

const login = async(req, res) => {
  const { username, password } = req.body;
  if (username === "tomasinoweb" && password === "tmsnw3btech") {
    const apiKey = generateApiKey();
    storeApiKey(apiKey);
    res.status(200).json({ 'success': true, 'api_token': apiKey });
  } else {
    res.status(401).json({ 'success': false });
  }
};

export { login };