import crypto from 'crypto';

const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateApiKey(length = 64) {
  const charCount = CHARSET.length; // 62
  const maxValidByte = 256 - (256 % charCount); 
  
  let key = '';
  while (key.length < length) {

    const bytes = crypto.randomBytes(length - key.length + 10);
    for (let i = 0; i < bytes.length && key.length < length; i++) {
      const byte = bytes[i];

      if (byte < maxValidByte) {
        key += CHARSET[byte % charCount];
      }
    }
  }

  return key;
}

export { generateApiKey };