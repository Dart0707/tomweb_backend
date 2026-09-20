import express from 'express';

const app = express();

const apiKeyMap = new Map();

function storeApiKey (apiKey) {
  const now = Date.now();
  const expiresAt = now + 5 * 60 * 1000; // 5 minutes in milliseconds
  apiKeyMap.set(apiKey, {
    createdAt: new Date(now),
    expiresAt,
    status: 'active'
  });
  return { createdAt: new Date(now), expiresAt, status: 'active' };
}

function authenticateApiKey(apiKey) {
  const apiKeyData = apiKeyMap.get(apiKey);
  if (!apiKeyData) {
    return false;
  }
  if (Date.now() > apiKeyData.expiresAt) {
    return false;
  }
  else{
    return true;
  } // API key is valid
}

//Optional middleware to authenticate API key for specific routes
const authMiddleware = (req, res, next) => {
  const apiKey = req.get('X-API-Token');
  if (!apiKey || !authenticateApiKey(apiKey)) {
    return res.status(401).json({ success: false });
  }
  next();
}

export { storeApiKey, authenticateApiKey, authMiddleware };