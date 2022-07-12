# React Native Chat App "ChattyBetty"

<img src="https://user-images.githubusercontent.com/99111208/178363817-b190645e-d0ee-436f-bf36-4cec031be7d1.jpg" width="600"/>

(image source chatting girls: pngtree)

## Description

This chat app for mobile devices was developed using React Native. It optimized for both Android and iOS devices. The app provides users with a chat interface and options to share images and the user's location.

## User Stories

* As a new user, I want to be able to easily enter a chat room, so I can quickly start talking to my
friends and family.
* As a user, I want to be able to send messages to my friends and family members to exchange
the latest news.
* As a user, I want to send images to my friends to show them what I’m currently doing.
* As a user, I want to share my location with my friends to show them where I am.
* As a user, I want to be able to read my messages offline, so I can reread conversations at any
time.
* As a user with a visual impairment, I want to use a chat app that is compatible with a screen
reader so that I can engage with a chat interface.

## Key Features

* A page where users can enter their name and choose a background color for the chat screen before joining the chat.
* A page displaying the conversation, as well as an input field and submit button.
* The chat must provide users with two additional communication features: sending images
and location data.
* Data gets stored online and offline.

## How to run and use the project ...

### Pre-requisites to clone the project

Install [Expo](https://expo.dev/): 
```
npm install expo-cli -g
```

For Windows and Linux: Install [Android Studio](https://developer.android.com/studio).
For more information how to set up an emulator, look [here](https://docs.expo.dev/workflow/android-studio-emulator/?redirected)

For Mac: Install [XCode](https://developer.apple.com/xcode/)

Install the Expo app on your mobile device (available in Google Play Store and Apple Store)

### Getting started

* install all the dependencies: ```npm i```

* start the app: ```expo start``` or ```npm start```

* Launch app on smartphone: scan QR code in Expo GUI

* Launch app on emulator: Press "Run on Android device/emulator" or "Run on iOS emulator" or "run in web browser" in Expo GUI

<img src="https://user-images.githubusercontent.com/99111208/178460648-7e87d5e4-a1e4-41f7-82b3-9fb895df813e.png" width="300">

### Dependencies

![Screenshot 2022-07-12 at 10 30 15](https://user-images.githubusercontent.com/99111208/178494171-445dff91-1ecd-43c4-9a3c-0ca9b3fcd848.png)

### Install and connect to own database - step-by-step

In order to use this chat app, you have to create your own Google Firebase/Firestore account for data storage.
In the following section, I describe the necessary steps to connect the chat to your database. If you get stuck, please refer to the [Firebase documentation](https://firebase.google.com/docs/web/setup)

1. Sign into https://firebase.google.com/ to get started

2. Click on "create a project" and follow the steps (does not matter if you agree to Google analytics or not). When you create the database, choose to start in test mode, because then you don't have to specify any security rules yet. Arrived at the last step ("Start a collection") click on "Auto-ID" to generate a random Document ID.

<img src="https://user-images.githubusercontent.com/99111208/178453711-d3d74285-daa1-4524-95ac-9b808c5a49ba.png" width="500">


<img src="https://user-images.githubusercontent.com/99111208/178454432-e0373943-8e34-4c18-92b3-7ffaf4ca9349.png" width="500">

<img src="https://user-images.githubusercontent.com/99111208/178454441-d240cb93-4ed5-41e0-8339-393534749b8c.png" width="500">

<img src="https://user-images.githubusercontent.com/99111208/178455235-842c8e18-5f71-4dc4-8c88-b51831482ad0.png" width="500">

<img src="https://user-images.githubusercontent.com/99111208/178456537-571faafb-f0db-480d-98c6-9c179a4c6093.png" width="500">

3. Install Firestore via Firebase in your project: ```npm install firebase```

4. Create a new directory "config" and add a new file "firebase.js" to it. 

5. Back in the Firebase project in the browser, open up "Settings", then "General" tab. Under the section "Your apps" you can link Firebase to your app by clicking the tag icon.

<img src="https://user-images.githubusercontent.com/99111208/178458432-61c97111-af54-4321-b974-3d73609d6d81.png" width="500">

6. After connecting you can generate configurations for different platforms. Here, click "Firestore for Web" and then copy the contents of the config object info your config/firebaseConfig.dist.js file. Also make sure to initialize the App by adding ```import firebase from firebase``` at the top of the file firebase.js and initialize the app there like so: ```const firebaseApp = initializeApp(firebaseConfig)```

config/firebase.js

<img src="https://user-images.githubusercontent.com/99111208/178467611-08d9be3e-f522-46f3-ba5b-afbd8ae7e09e.png" width="500">

config/ firebaseConfig.dist.js

<img src="https://user-images.githubusercontent.com/99111208/178468684-5b4a6c93-8a0f-4ca6-9293-666a7f687066.png" width="500">

7. Make sure to change the name in the reference to the Firestore collection in your components/chat.js file from currently "messages" to the name you chose for your collection (in the screenshots about "test").

<img src="https://user-images.githubusercontent.com/99111208/178460004-1b928c2c-446b-4752-91db-4908a9848017.png" width="500">

## Learnings

### ... from working with firebase storage
I ran into quite some errors originating from firebase/firestore.
One example was that expo would crash as soon as I tried to upload an image and used the function "uploadBytes" in conjunction with "getUploadURL".
I tried several approaches to get to the bottom of it. One was to downgrade firebase from 9.7.* to 9.4.1, because this issue seemed to be very common in versions higher than 9.4.1 [see discussions on stackoverflow] (https://github.com/firebase/firebase-js-sdk/issues/5848).
Also, I adjusted the firebase storage rules 
```
rules_version = '2';
service firebase.storage {
    match /b/{bucket}/o {
            match /{allPaths=**} {
            allow read, write: if true;
            }
        }
}
```

### ... from working with react-native

Whenever offline the messages in the chat disappeared, because AsyncStorage has been extracted from react-native core, and I had to install and import @react-native-async-storage/async-storage instead of react-native
[See more information on GitHub](https://github.com/react-native-async-storage/async-
storage)

### ... from working with Expo

Repeatedly the expo web browser did not open because of dependency issues with packages from react native. For example: Expo required me to use more outdated versions of @react-native-community/netinfo as well as react-native-maps to be compatible with Expo.


### ... from the whole project

Again and again, I stumbled over problems resulting from the combination of expo, react-native and firebase. Figuring out, where it came from and debugging the problem - at least seemed - more tedious on mobile. As always it was enriching to try out new libraries and services or apply familiar technologies in a new context. But I probably would rather concentrate on web development, given freedom in my decision.


