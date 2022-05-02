# Timetable

This application can either be running using the expo client, by loading the APK file into an Android emulator, or by loading the APK into an Android device.
</br>IMPORTANT: If you choose to run using expo, it must be run using an Android device.

# Expo
In order to run the application running expo there are few steps you must take:
</br>
</br><h2>1. Node.js</h2>
The first thing you need to do is install Node.js, goto https://nodeks.org/en/ and download the latest version. Install it and run the following command in your CMD terminal to check wheter it's installed `node -v` Ensure your node is version v14.18.0 or higher.
</br>
</br><h2>2. Expo</h2>
Next we need to install Expo and React-Native which will be installed as a dependency.
</br>In a terminal do the following:
</br>
</br>`npm install --global expo-cli`
</br>
</br>It might take a bit of time,. Once finished, you might get some warnings, but they are for additional dependencies - so we can ignore them for now. Run `expo -V`.
</br>
</br><h2>3. Expo App</h2>
Next, we need to install the client app for our mobile device. We use this to run the application.
</br> The app can be found here: https://play.google.com/store/apps/details?id=host.exp.exponent
</br>
</br><h2>4. Running the Application</h2>
To run the application, using CMD you must navigate inside the folder Timetable folder that was provided on Brightspace. Now type `npm install` to install all the necessary dependencies, this may take a few minutes. Once this has completed type `expo start` into the same command line and a script should start running and tab should open in your browser. Next open the expo app that you installed and press the **Scan QR Code** button. How scan the QR code that should have appear in the top left of the tab that opened. For this to work properly the PC and the phone must be on the same WiFi network. If all the previous steps have been followed correctly the Timetable application should load onto the phones screen.

# APK - Android Device
To install the application on your device, you must take the file from Brightspace labeled **Visualise_APK** and transfer it onto your mobile device. This can be done by connecting you phone to your PC using a usb cable.
</br>Once the file is on your device you must locate it using the file manager that is installed on your device. Once you find the file click on it and you should be prompted to install the app, follow the steps on screen until it says the app has been installed.
</br>Opening your apps tab you should now be able to open the application.

# APK - Android Emulator
Take  the **Visualise_APK** file and load it onto your emulator of choice
