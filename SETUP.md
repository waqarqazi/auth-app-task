# Setup Guide

This guide provides detailed step-by-step instructions for setting up the React Native Authentication App from scratch.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Project Initialization](#project-initialization)
- [File Configuration](#file-configuration)
- [Running the App](#running-the-app)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have the following installed:

### Required Software

1. **Node.js** (version 18 or higher)
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node --version`
   - Verify npm: `npm --version`

2. **React Native CLI**
   ```bash
   npm install -g react-native-cli
   ```

3. **For Android Development:**
   - **Android Studio** ([Download](https://developer.android.com/studio))
   - Android SDK (API Level 33 or 34)
   - Android SDK Platform-Tools
   - Android Virtual Device (AVD) Manager
   - Set `ANDROID_HOME` environment variable:
     - Windows: `C:\Users\YourUsername\AppData\Local\Android\Sdk`
     - macOS/Linux: `~/Library/Android/sdk` or `~/Android/Sdk`
   - Add to PATH: `$ANDROID_HOME/platform-tools` and `$ANDROID_HOME/tools`

4. **For iOS Development (macOS only):**
   - **Xcode** (latest version from App Store)
   - Xcode Command Line Tools:
     ```bash
     xcode-select --install
     ```
   - **CocoaPods**:
     ```bash
     sudo gem install cocoapods
     ```

5. **Java Development Kit (JDK)**
   - JDK 11 or 17 (required for Android)
   - Verify: `java -version`

## Environment Setup

### Windows

1. Install Android Studio and configure Android SDK
2. Set environment variables:
   ```powershell
   # In System Environment Variables
   ANDROID_HOME = C:\Users\YourUsername\AppData\Local\Android\Sdk
   
   # Add to PATH
   %ANDROID_HOME%\platform-tools
   %ANDROID_HOME%\tools
   %ANDROID_HOME%\tools\bin
   ```

### macOS

1. Install Xcode from App Store
2. Install Android Studio
3. Configure environment variables in `~/.zshrc` or `~/.bash_profile`:
   ```bash
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   export PATH=$PATH:$ANDROID_HOME/tools
   export PATH=$PATH:$ANDROID_HOME/tools/bin
   ```

### Linux

1. Install Android Studio
2. Configure environment variables in `~/.bashrc` or `~/.zshrc`:
   ```bash
   export ANDROID_HOME=$HOME/Android/Sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   export PATH=$PATH:$ANDROID_HOME/tools
   export PATH=$PATH:$ANDROID_HOME/tools/bin
   ```

## Project Initialization

### Step 1: Initialize React Native Project

Create a new React Native project with the specific version:

```bash
npx react-native@0.72.6 init AuthApp --version 0.72.6
cd AuthApp
```

**Note:** This will create the `android/` and `ios/` folders with all necessary native configurations.

### Step 2: Copy Project Files

From this repository, copy the following files and folders to your new `AuthApp` project:

#### Source Code Files
```bash
# Copy the entire src folder
cp -r /path/to/task/src ./src

# Copy main app files
cp /path/to/task/App.tsx ./
cp /path/to/task/index.js ./
cp /path/to/task/app.json ./
```

#### Configuration Files
```bash
# TypeScript and build configs
cp /path/to/task/tsconfig.json ./
cp /path/to/task/babel.config.js ./
cp /path/to/task/metro.config.js ./

# Code quality configs
cp /path/to/task/.eslintrc.js ./
cp /path/to/task/.prettierrc.js ./

# Testing configs
cp /path/to/task/jest.config.js ./
cp /path/to/task/jest.setup.js ./
```

**Windows PowerShell:**
```powershell
# Copy src folder
Copy-Item -Path "C:\path\to\task\src" -Destination ".\src" -Recurse

# Copy individual files
Copy-Item "C:\path\to\task\App.tsx" -Destination ".\App.tsx"
Copy-Item "C:\path\to\task\index.js" -Destination ".\index.js"
Copy-Item "C:\path\to\task\app.json" -Destination ".\app.json"
Copy-Item "C:\path\to\task\tsconfig.json" -Destination ".\tsconfig.json"
Copy-Item "C:\path\to\task\babel.config.js" -Destination ".\babel.config.js"
Copy-Item "C:\path\to\task\metro.config.js" -Destination ".\metro.config.js"
Copy-Item "C:\path\to\task\.eslintrc.js" -Destination "\.eslintrc.js"
Copy-Item "C:\path\to\task\.prettierrc.js" -Destination "\.prettierrc.js"
Copy-Item "C:\path\to\task\jest.config.js" -Destination ".\jest.config.js"
Copy-Item "C:\path\to\task\jest.setup.js" -Destination ".\jest.setup.js"
```

### Step 3: Update package.json

Merge the dependencies from this repository's `package.json` with your new project's `package.json`.

**Option A: Manual Merge**
1. Open both `package.json` files
2. Copy dependencies and devDependencies from this repository
3. Copy scripts section
4. Ensure `engines` section includes `"node": ">=18"`

**Option B: Replace (if starting fresh)**
```bash
cp /path/to/task/package.json ./package.json
```

### Step 4: Install Dependencies

Install all required npm packages:

```bash
npm install
# or
yarn install
```

**Required Dependencies:**
- `@react-native-async-storage/async-storage`
- `@react-navigation/native`
- `@react-navigation/native-stack`
- `react-native-gesture-handler`
- `react-native-safe-area-context`
- `react-native-screens`

### Step 5: iOS Setup (macOS only)

If you're developing for iOS, install CocoaPods dependencies:

```bash
cd ios
pod install
cd ..
```

**Note:** Always use the `.xcworkspace` file (not `.xcodeproj`) when opening the project in Xcode:
```bash
open ios/AuthApp.xcworkspace
```

### Step 6: Android Configuration

The Android project should already be configured, but verify:

1. **Check `android/build.gradle`:**
   - Android Gradle Plugin version: 8.0.2
   - Gradle version: 8.0.1

2. **Check `android/app/build.gradle`:**
   - `compileSdkVersion`: 34
   - `targetSdkVersion`: 34
   - `minSdkVersion`: 21

3. **Verify Android SDK:**
   - Open Android Studio
   - Go to Tools → SDK Manager
   - Ensure Android SDK Platform 34 is installed

## File Configuration

### TypeScript Configuration

The `tsconfig.json` is already configured for React Native. No changes needed unless you want to customize TypeScript settings.

### Metro Bundler Configuration

The `metro.config.js` is configured for React Native 0.72.6. It should work out of the box.

### Babel Configuration

The `babel.config.js` includes the necessary presets for React Native and TypeScript.

## Running the App

### Start Metro Bundler

In the project root directory, start the Metro bundler:

```bash
npm start
# or
yarn start
```

Keep this terminal open. The Metro bundler must be running for the app to work.

### Run on Android

**Prerequisites:**
- Android Studio installed
- Android Virtual Device (AVD) created OR physical device connected
- USB debugging enabled (for physical devices)

**Steps:**

1. **Create AVD (if using emulator):**
   - Open Android Studio
   - Tools → Device Manager
   - Create Virtual Device
   - Select a device (e.g., Pixel 5)
   - Select system image (API 33 or 34)
   - Finish and start the emulator

2. **Verify device connection:**
   ```bash
   adb devices
   ```
   Should list your device/emulator

3. **Run the app:**
   ```bash
   npm run android
   # or
   yarn android
   ```

**Troubleshooting Android:**
- If build fails, try: `npm run clean:android`
- Ensure `ANDROID_HOME` is set correctly
- Check Java version: `java -version` (should be JDK 11 or 17)
- Clean and rebuild: `cd android && ./gradlew clean && cd ..`

### Run on iOS (macOS only)

**Prerequisites:**
- Xcode installed
- iOS Simulator available
- CocoaPods installed

**Steps:**

1. **Open Xcode:**
   ```bash
   open ios/AuthApp.xcworkspace
   ```
   ⚠️ **Important:** Use `.xcworkspace`, not `.xcodeproj`

2. **Select Simulator:**
   - In Xcode, select a simulator from the device dropdown
   - Or use command line:
     ```bash
     npm run ios
     # or
     yarn ios
     ```

**Troubleshooting iOS:**
- If build fails, try: `cd ios && pod install && cd ..`
- Ensure CocoaPods is installed: `pod --version`
- Clean build folder in Xcode: Product → Clean Build Folder (Shift+Cmd+K)

## Troubleshooting

### Common Issues

#### 1. Metro Bundler Issues

**Problem:** Metro bundler won't start or shows errors

**Solutions:**
```bash
# Clear Metro cache
npm start -- --reset-cache

# Clear watchman (if installed)
watchman watch-del-all

# Clear npm cache
npm cache clean --force
```

#### 2. Android Build Failures

**Problem:** Gradle build fails

**Solutions:**
```bash
# Clean Android build
cd android
./gradlew clean
cd ..

# Delete build folders
rm -rf android/app/build
rm -rf android/build

# Rebuild
npm run android
```

#### 3. iOS Build Failures

**Problem:** Xcode build fails or CocoaPods issues

**Solutions:**
```bash
# Reinstall pods
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..

# Clean Xcode build
# In Xcode: Product → Clean Build Folder (Shift+Cmd+K)
```

#### 4. TypeScript Errors

**Problem:** TypeScript compilation errors

**Solutions:**
```bash
# Check for type errors
npm run type-check

# Ensure all dependencies are installed
npm install

# Verify tsconfig.json is correct
```

#### 5. Navigation Issues

**Problem:** Navigation not working or screens not rendering

**Solutions:**
- Ensure all navigation dependencies are installed
- Check that `react-native-gesture-handler` is properly linked
- For Android, ensure `MainActivity.java` imports are correct

#### 6. AsyncStorage Issues

**Problem:** AsyncStorage not persisting data

**Solutions:**
- Verify `@react-native-async-storage/async-storage` is installed
- Check that the package is properly linked (should be automatic in RN 0.60+)

### Environment-Specific Issues

#### Windows

- **Path Issues:** Ensure Android SDK paths use forward slashes or escaped backslashes
- **Java Issues:** Use JDK 11 or 17, not JDK 8 or newer versions
- **PowerShell:** Use PowerShell 5.1+ or Windows Terminal

#### macOS

- **CocoaPods:** May need `sudo` for installation
- **Xcode:** Ensure Command Line Tools are installed
- **Permissions:** May need to grant permissions in System Preferences

#### Linux

- **Android SDK:** May need to set executable permissions:
  ```bash
  chmod +x android/gradlew
  ```
- **Java:** Install OpenJDK 11 or 17

## Verification

After setup, verify everything works:

1. **Check Dependencies:**
   ```bash
   npm list --depth=0
   ```

2. **Type Check:**
   ```bash
   npm run type-check
   ```

3. **Lint:**
   ```bash
   npm run lint
   ```

4. **Run Tests:**
   ```bash
   npm test
   ```

5. **Start App:**
   - Start Metro: `npm start`
   - Run on device: `npm run android` or `npm run ios`

## Next Steps

Once the app is running:

1. Test the Login screen
2. Test the Signup screen
3. Verify form validation
4. Test navigation between screens
5. Test logout functionality
6. Verify persistence (close and reopen app)

## Additional Resources

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [React Navigation Documentation](https://reactnavigation.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Android Studio Setup](https://developer.android.com/studio)
- [Xcode Setup](https://developer.apple.com/xcode/)

## Support

If you encounter issues not covered in this guide:

1. Check the [BUILD_NOTES.md](./BUILD_NOTES.md) for build-specific information
2. Review the [README.md](./README.md) for project overview
3. Check React Native and dependency documentation
4. Search for similar issues on Stack Overflow or GitHub

---

**Last Updated:** Based on React Native 0.72.6 setup requirements

