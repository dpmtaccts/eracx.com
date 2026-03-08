import crypto from 'crypto'

const ALGORITHM = 'aes-256-gcm'

function getKey() {
  const key = process.env.ENCRYPTION_KEY
  if (!key || key.length !== 64) {
    throw new Error('ENCRYPTION_KEY must be a 64-char hex string (32 bytes)')
  }
  return Buffer.from(key, 'hex')
}

export function encrypt(plaintext) {
  const key = getKey()
  const iv = crypto.randomBytes(12)
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv)
  let encrypted = cipher.update(plaintext, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  const tag = cipher.getAuthTag().toString('hex')
  return `${iv.toString('hex')}:${tag}:${encrypted}`
}

export function decrypt(ciphertext) {
  const key = getKey()
  const [ivHex, tagHex, encrypted] = ciphertext.split(':')
  const iv = Buffer.from(ivHex, 'hex')
  const tag = Buffer.from(tagHex, 'hex')
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv)
  decipher.setAuthTag(tag)
  let decrypted = decipher.update(encrypted, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  return decrypted
}
