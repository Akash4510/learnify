import crypto from "crypto";

const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";

export const generateAffiliateHash = (userId: string) => {
  return crypto.createHmac("sha256", SECRET_KEY).update(userId).digest("hex");
};

export const verifyAffiliateHash = (ref: string, userId: string) => {
  return ref === generateAffiliateHash(userId);
};
