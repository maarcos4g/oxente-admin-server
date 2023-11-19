import { firebaseAdmin } from "../config/firebase-admin"

export function firebaseStorageService() {

  const { adminApp } = firebaseAdmin()

  const bucket = adminApp.storage().bucket()

  return { bucket }
}