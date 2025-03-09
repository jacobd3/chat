import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
} from "firebase/auth";
import { getAuth } from "firebase/auth";
import app from "./firebaseConfig";

const auth = getAuth(app);

interface AuthCredentials {
  email: string;
  password: string;
}

export async function doCreateUserWithEmailAndPassword(
  email: string,
  password: string
) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function doSignInWithEmailAndPassword({
  email,
  password,
}: AuthCredentials) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function doSignOut() {
  return auth.signOut();
}

export function doPasswordResetEmail({ email }: AuthCredentials) {
  return sendPasswordResetEmail(auth, email);
}

export function doPasswordChange({ password }: AuthCredentials) {
  if (auth.currentUser) {
    return updatePassword(auth.currentUser, password);
  }
}

export function doSendEmailVerification() {
  if (auth.currentUser) {
    return sendEmailVerification(auth.currentUser, {
      url: `${window.location.origin}`,
    });
  }
}

export default auth;
