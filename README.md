## Cauli Detect — App Overview

Cauli Detect is a React Native app (Expo + expo-router) that lets users detect cauliflower in photos using Google Vision, with a clean tabbed UI and Firebase Email/Password authentication.

### Features

- Camera and gallery input to analyze images for cauliflower.
- AI result screen with confidence, optional details (size/freshness/quality), and history.
- Persistent detection history (last 20) stored locally with cached image copies.
- Auth: login, signup, reset password, and sign out (Firebase Auth).
- Auth-based routing: unauthenticated users see the auth stack; authenticated users see the tabbed app.

### App structure (expo-router)

- app/\_layout.tsx — Root layout; wraps the app in AuthProvider and decides between stacks.
- app/index.tsx — Initial route that redirects to (tabs) or (auth) based on auth state.
- app/(auth)/ — Public auth stack
  - login.tsx — Email/password sign-in
  - signup.tsx — Account creation
  - reset.tsx — Password reset (email link)
- app/(tabs)/ — Protected tabs for signed-in users
  - \_layout.tsx — Tab bar with Detect, History, Settings
  - index.tsx — Detect screen (camera, gallery, and analyze flow)
  - history.tsx — List of previous detections; delete/clear; pull-to-refresh
  - settings.tsx — App info, stats, and sign out

### Authentication

- Firebase configured in services/firebase.ts (client SDK). Email/password auth.
- AuthProvider (providers/AuthProvider.tsx) exposes user, signIn, signUp, resetPassword, and signOut.
- Root layout shows (auth) when user is null, otherwise (tabs). Individual tab screens also guard and redirect to login if needed.

### Detection flow

1. Image is captured via camera or selected from gallery on Detect screen.
2. services/DetectionService converts the image to base64 and calls Google Vision images:annotate (Label Detection + Object Localization).
3. Responses are analyzed for cauliflower keywords; confidence is computed and capped at 95%.
4. Result is saved to local history along with a cached copy of the image (expo-file-system) and displayed in the UI.
5. If the API call fails or no key is set, a mock detection runs to keep UX smooth.

### Data and storage

- History: AsyncStorage key cauliflowers_detection_history, limited to the latest 20 items.
- Images: Copied into the app’s document directory for stable thumbnails.
- Environment: Requires EXPO_PUBLIC_GOOGLE_VISION_API_KEY for the Vision API.

### Tech stack

- React Native 0.79 (Expo SDK 53), expo-router 5
- Firebase (Auth)
- Google Vision API (images:annotate)
- AsyncStorage and expo-file-system for persistence
- lucide-react-native icons, react-native-reanimated for animations

### Run it

1. Install dependencies
   - npm install
2. Set your environment variable
   - EXPO_PUBLIC_GOOGLE_VISION_API_KEY in your env (or app config) for production detection
3. Start the dev server
   - npm run dev

Notes

- Firebase client config is public by design. Ensure you configure allowed domains and security rules in the Firebase console.
- On first launch, unauthenticated users will see the Login screen; once signed in, they’re redirected to the main tabs.
