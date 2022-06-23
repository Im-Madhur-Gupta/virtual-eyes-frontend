<h1 align="center">Virtual Eyes</h3>
<p align="center">
    A pair of eyes for those who can't see.
</p>
<div align="center">
    <img src="readmeContent/splash.gif" alt="Logo" height="500">
</div>

## About The App

- Virtual Eyes is a small gesture from my side in making images _visible_ to the blind people.
- It does the following -
  - Visualize an image.
  - Identify loved ones in images.
- It was made keeping in mind the needs of blind people and it is Google Talkback friendly.
- It utilizes Azure Cloud Service for face recognition and image visualization.

### Tech Stack

- React Native
- NodeJS
- MongoDB
- Azure Cloud Services
  - Azure Face API
  - Azure Computer Vision
  - Azure App Service

### Features

- **Visualize an Image** -

  - Select an image and get a text-based description of it.

  <div align="center">
    <img src="readmeContent/visualize-image.jpg" alt="Logo" height="500">
  </div>

- **Detect People from an image** -

  - Add your loved ones to your group.
  - Find people in an image from your group.

  <p float="left" align="middle">
    <img src="readmeContent/add-people.jpg" alt="Logo" height="500">
    <img src="readmeContent/find-people.jpg" alt="Logo" height="500">
  </p>

## Getting Started

You can run a local build of Virtual Eyes on your Android phone, follow the below steps to do so or you may download the latest build apk from releases section.

### Prerequisites

- You should have an Android Device connected to your computer with adb drivers installed and USB debugging turned on.
- You should have [`NodeJS`](https://nodejs.org/en/) and `yarn` installed on your computer.

  [Follow the expo documentation in case of issues.](https://docs.expo.dev/get-started/installation/)

### Installation

1. ```sh
   cd ./virtual-eyes-frontend
   ```
2. ```sh
   yarn add -g expo-cli
   ```
3. ```sh
   yarn
   ```
4. ```sh
   expo run:android
   ```

## Future Plans

- [ ] Functionality to delete a specific person from group.
- [ ] Add object detection.
- [ ] Add voice based navigation to make the app more accessible to the blind.

<p align="center">
Made with Love ❤️, Respect 🙏 and Passion 👨🏽‍💻.
<p>
