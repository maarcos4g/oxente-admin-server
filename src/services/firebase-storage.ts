import { firebaseAdmin } from "../config/firebase-admin"

export async function firebaseStorageService() {

  const { adminApp } = await firebaseAdmin()

  const bucket = adminApp.storage().bucket()

  return { bucket }
}