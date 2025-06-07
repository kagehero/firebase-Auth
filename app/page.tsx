// Firebase Auth Demo - Single Page (Next.js + Tailwind CSS)

'use client';
import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  User
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDMXD4H4WDlnSY_eVjvgEQ8D3IDVVN5HQI",
  authDomain: "codeingwizard-f194a.firebaseapp.com",
  projectId: "codeingwizard-f194a",
  storageBucket: "codeingwizard-f194a.firebasestorage.app",
  messagingSenderId: "155496397455",
  appId: "1:155496397455:web:b969ab7893c57a89084efa",
  measurementId: "G-TJQD2CRBZC"
};

initializeApp(firebaseConfig);
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

export default function FirebaseAuthDemo() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = () => {
    signInWithRedirect(auth, googleProvider);
  };

  const handleEmailAuth = async () => {
    if (isRegister) {
      await createUserWithEmailAndPassword(auth, email, password);
    } else {
      await signInWithEmailAndPassword(auth, email, password);
    }
  };

  const handleLogout = () => {
    signOut(auth);
  };

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-2xl font-semibold mb-4">Welcome, {user.email || user.displayName}</h2>
          <p className="mb-4">You are now logged in.</p>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Firebase Auth Demo</h1>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
          <button
            onClick={handleEmailAuth}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {isRegister ? 'Register' : 'Login'} with Email
          </button>
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="w-full text-sm text-blue-600 hover:underline"
          >
            {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
          </button>
        </div>

        <hr className="my-6" />

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
}
