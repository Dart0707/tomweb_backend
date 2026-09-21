import { generateApiKey } from '../utils/generateKey.js';
import { storeApiKey, setSessionCookies } from '../middleware/authMiddleware.js';
import { comparePassword, hashPassword } from '../utils/encryption.js';

const configuredPasswordHash = hashPassword(process.env.PASSWORD);

const login = async(req, res) => {
  const { username, password } = req.body;
  if (username === "tomasinoweb" && await comparePassword(password, await configuredPasswordHash)) {
    const apiKey = generateApiKey();
    storeApiKey(apiKey);

    setSessionCookies(res, username);
    res.status(200).json({ 'success': true, 'api_token': apiKey });
  } else {
    res.status(401).json({ 'success': false });
  }
};

export { login };