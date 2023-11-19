import admin from "firebase-admin"

var serviceAccount = require("../../config/oxente-firebaseKey.json");

export function firebaseAdmin() {
  const adminApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.STORAGE_BUCKET,
  });

  return { adminApp }
}