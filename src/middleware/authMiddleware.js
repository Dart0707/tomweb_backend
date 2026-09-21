import express from 'express';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';

const app = express();

app.use(cookieParser());
app.use(express.json());

const apiKeyMap = new Map();
const ACCESS_TOKEN_MAX_DURATION = 5 * 60 * 1000;
const REFRESH_TOKEN_MAX_DURATION = 7 * 24 * 60 * 60 * 1000;

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

function setSessionCookies(res, username) {
  const accessToken = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m' });
  const refreshToken = jwt.sign({ username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

  res.cookie('accessToken', accessToken,
  {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: ACCESS_TOKEN_MAX_DURATION,
    sameSite: 'lax',
    path: '/',
  })
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: REFRESH_TOKEN_MAX_DURATION,
    sameSite: 'lax',
    path: '/',
  });
  return { accessToken, refreshToken };
}

//Optional middleware to authenticate API key for specific routes
const authMiddleware = (req, res, next) => {
  const apiKey = req.get('X-API-Token');
  if (apiKey && authenticateApiKey(apiKey)) {
    return next();
  }

  const {accessToken, refreshToken } = req.cookies || {};

  if (accessToken) {
    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      req.user = decoded;
      return next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid access token' });
    }
  }

  if (refreshToken) {
    try {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      const newAccessToken = jwt.sign({ username: decoded.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m' });
      res.cookie('accessToken', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: ACCESS_TOKEN_MAX_DURATION,
        sameSite: 'lax',
        path: '/',
      });
      req.user = decoded;
      return next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }
  }
  return res.status(401).json({ success: false });
}

export { storeApiKey, authenticateApiKey, authMiddleware, setSessionCookies};