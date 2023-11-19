import admin from "firebase-admin"

async function getServiceAccountFromUrl(url: string) {
  const response = await fetch(url);
  const json = await response.json();
  return json;
}

let serviceAccount: any;

export async function firebaseAdmin() {

  if (process.env.KEY_PATH) {
    serviceAccount = await getServiceAccountFromUrl(process.env.KEY_PATH);
  } else {
    serviceAccount = require("../../config/oxente-firebaseKey.json");
  }

  const adminApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.STORAGE_BUCKET,
  });

  return { adminApp }
}