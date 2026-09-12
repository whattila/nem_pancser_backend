import * as dotenv from 'dotenv';

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;
const jwtSecret = process.env.JWT_SECRET;
const bcryptSaltRoundsAsString = process.env.BCRYPT_SALT_ROUNDS;
const authDisabledAsString = process.env.AUTH_DISABLED;

const bcryptSaltRounds = bcryptSaltRoundsAsString ? parseInt(bcryptSaltRoundsAsString) : undefined;
const authDisabled = authDisabledAsString === 'true';

if (!databaseUrl) {
  throw new Error('DATABASE_URL is required');
}

if (!jwtSecret) {
  throw new Error('JWT_SECRET is required');
}

if (!bcryptSaltRounds) {
  throw new Error('BCRYPT_SALT_ROUNDS is required');
}

export default {
  databaseUrl,
  jwtSecret,
  bcryptSaltRounds,
  authDisabled
};