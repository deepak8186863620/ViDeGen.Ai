import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// --- CONFIGURATION ---
// PASTE YOUR FIREBASE CONFIG HERE
const firebaseConfig = {
   apiKey: "AIzaSyC4WrPhlD554cEYqMhqI_h5uie2llLV54g",
  authDomain: "videgen-d8280.firebaseapp.com",
  projectId: "videgen-d8280",
  storageBucket: "videgen-d8280.firebasestorage.app",
  messagingSenderId: "260859459250",
  appId: "1:260859459250:web:8b2173189ca7de63cafbab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// --- GLOBAL STATE ---
let isLoginMode = true;

// --- DOM ELEMENTS MAPPING (Matches your HTML) ---
const elements = {
    // Screens
    authScreen: document.getElementById('auth-screen'),
    appScreen: document.getElementById('app-screen'),
    emailLoginPanel: document.getElementById('email-login-panel'),
    
    // Auth UI
    modalTitle: document.querySelector('#email-login-panel h2'), // "Sign in with Email"
    modalForm: document.getElementById('modal-login-form'),
    emailInput: document.getElementById('modal-auth-email'),       // UPDATED ID
    passwordInput: document.getElementById('modal-auth-password'), // UPDATED ID
    closeEmailBtn: document.getElementById('close-email-login'),
    emailCtaBtn: document.getElementById('email-cta-btn'),         // "Continue with Email"
    createAccountBtn: document.getElementById('email-create-btn'), // "Create Account"
    authToggleText: document.getElementById('auth-toggle-text'),   // The bottom text button
    authError: document.getElementById('auth-error'),
    googleBtn: document.getElementById('google-signin-btn'),
    
    // App UI
    userEmailHeader: document.getElementById('user-email-header'),
    userAvatar: document.getElementById('user-avatar'),
    logoutBtn: document.querySelector('button[title="Logout"]'), // Found via title attribute
    authStatus: document.getElementById('auth-status-indicator')
};

// --- AUTHENTICATION FUNCTIONS ---

// 1. Toggle between Login and Signup modes
function setAuthMode(mode) {
    isLoginMode = mode === 'login';
    
    // Update UI Text
    if (elements.modalTitle) {
        elements.modalTitle.textContent = isLoginMode ? 'Sign in with Email' : 'Create Account';
    }
    
    // Update the submit button text inside the form
    const submitBtn = elements.modalForm.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.textContent = isLoginMode ? 'Sign In' : 'Sign Up';

    // Update the toggle text at the bottom
    // If we are in login mode, prompt to create account. If in create mode, prompt to sign in.
    const bottomTextSpan = elements.authToggleText.previousElementSibling; // The <span>New to ViDeGen?</span>
    if (bottomTextSpan) {
        bottomTextSpan.textContent = isLoginMode ? "New to ViDeGen?" : "Already have an account?";
    }
    elements.authToggleText.textContent = isLoginMode ? "Create Account" : "Sign In";

    // Clear errors
    showError(null);
}

// 2. Show/Hide the Side Panel
function toggleEmailPanel(show) {
    if (show) {
        elements.emailLoginPanel.classList.remove('hidden');
        elements.emailLoginPanel.classList.add('animate-slide-in'); // Optional animation class
    } else {
        elements.emailLoginPanel.classList.add('hidden');
    }
}

// 3. Handle Form Submission
async function handleAuthSubmit(e) {
    e.preventDefault();
    const email = elements.emailInput.value;
    const password = elements.passwordInput.value;
    showError(null); // Clear previous errors

    try {
        if (isLoginMode) {
            await signInWithEmailAndPassword(auth, email, password);
            // onAuthStateChanged will handle the redirect
        } else {
            // Create user
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // Create user document in Firestore
            await setDoc(doc(db, "users", userCredential.user.uid), {
                email: email,
                createdAt: serverTimestamp(),
                tier: 'free'
            });
        }
        toggleEmailPanel(false); // Close panel on success
    } catch (error) {
        console.error(error);
        let msg = "Authentication failed.";
        if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') msg = "Invalid email or password.";
        if (error.code === 'auth/email-already-in-use') msg = "Email already in use. Try logging in.";
        if (error.code === 'auth/weak-password') msg = "Password must be at least 6 characters.";
        showError(msg);
    }
}

// 4. Handle Google Sign In
async function handleGoogleAuth() {
    const provider = new GoogleAuthProvider();
    try {
        await signInWithPopup(auth, provider);
    } catch (error) {
        console.error("Google Auth Error:", error);
        showError("Google Sign-In failed.");
    }
}

// 5. Helper to show errors
function showError(msg) {
    if (!elements.authError) return;
    if (msg) {
        elements.authError.textContent = msg;
        elements.authError.classList.remove('hidden');
    } else {
        elements.authError.classList.add('hidden');
    }
}

// --- INITIALIZATION ---

// Listen to Auth State Changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        elements.authScreen.classList.add('hidden');
        elements.appScreen.classList.remove('hidden');
        
        // Update Sidebar Header
        elements.userEmailHeader.textContent = user.email;
        elements.userAvatar.textContent = user.email.charAt(0).toUpperCase();
        elements.authStatus.classList.remove('hidden');
        
    } else {
        // User is signed out
        elements.authScreen.classList.remove('hidden');
        elements.appScreen.classList.add('hidden');
        elements.authStatus.classList.add('hidden');
    }
});

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Open Login Mode
    if(elements.emailCtaBtn) elements.emailCtaBtn.addEventListener('click', () => {
        setAuthMode('login');
        toggleEmailPanel(true);
    });

    // Open Sign Up Mode (Button 2)
    if(elements.createAccountBtn) elements.createAccountBtn.addEventListener('click', () => {
        setAuthMode('signup');
        toggleEmailPanel(true);
    });

    // Toggle Mode Text (Bottom of Auth Screen)
    if(elements.authToggleText) elements.authToggleText.addEventListener('click', () => {
        // Toggle the mode based on current state
        setAuthMode(isLoginMode ? 'signup' : 'login');
        // Ensure panel is open
        toggleEmailPanel(true);
    });

    // Close Panel
    if(elements.closeEmailBtn) elements.closeEmailBtn.addEventListener('click', () => toggleEmailPanel(false));

    // Form Submit
    if(elements.modalForm) elements.modalForm.addEventListener('submit', handleAuthSubmit);

    // Google Auth
    if(elements.googleBtn) elements.googleBtn.addEventListener('click', handleGoogleAuth);

    // Logout
    if(elements.logoutBtn) elements.logoutBtn.addEventListener('click', () => signOut(auth));
    
    // Make global for your inline onclicks (if any remain)
    window.toggleAuthMode = () => setAuthMode(isLoginMode ? 'signup' : 'login');
});