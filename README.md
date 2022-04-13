# Plower
## Moisture Monitoring System

A full-stack [React](https://reactjs.org) + [Node.js](https://nodejs.org/en/) application allows you to monitor the humidity level of your plants.

The Plower app is running on [Raspberry Pi](https://www.raspberrypi.org), which communicates with moisture sensors.

# Tech Stack

- [React](https://reactjs.org)
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com)
- [MongoDB](https://www.mongodb.com)
- [Balena](https://www.balena.io)

# Hardware
- [Raspberry Pi 3 B](https://www.raspberrypi.com/products/raspberry-pi-3-model-b/)
- Analog-to-digital converter [ADS1115](https://learn.adafruit.com/raspberry-pi-analog-to-digital-converters/ads1015-slash-ads1115)
- [Capacitive Soil Moisture Sensors v1.2](http://www.gikfun.com/belong-to-you-modules-c-68/capacitive-soil-moisture-sensor-corrosion-resistant-for-arduino-p-824.html)


# How to Setup App

To set up Plower, run the following commands in your Terminal:

`git clone git@github.com:ksdenisova/Plower.git`

`cd Plower`

# How to Build
To build the Plower app, run the following commands in the Terminal:

`cd client`

`npm run build`

# How to Setup Hardware

- Set up Raspberry Pi 3 with balenaOS using this [official guide](https://www.balena.io/docs/learn/getting-started/raspberrypi3/nodejs/). It is important to choose a device type that supports 64bit OS to be able to use MongoDB.

- Connect Sensors to ADS1115 using this diagram:

![Wiring-Diagram](https://user-images.githubusercontent.com/89826596/162974463-0af4f75f-e098-4c2c-982a-628f5b3d45f3.jpg)

- Install ADS1115 to Raspberry Pi.

After all setups, your hardware should look like this:

![2022-04-12 09 37 49](https://user-images.githubusercontent.com/89826596/162975141-1c41d33b-8089-4796-999b-0036878a64d6.jpg)


To check if Raspberry Pi sees the ADS1115, run the following command in the Balena Terminal:

`i2cdetect -y 1`

If everything is set up correctly, you will see the following (48 address set by default):

![CleanShot 2022-04-10 at 15 13 49@2x](https://user-images.githubusercontent.com/89826596/162975277-67b64e68-3122-4742-8e52-89cf72057e09.png)

# How to Calibrate Sensors
You should calibrate sensors when they dry first.

Open the Terminal in Balena Cloud and run the following command:

`npm start calibrate dry`

Then place sensors in water and run the following command:

`npm start calibrate wet`

# How to Run Plower
Open Balena Dashboard, copy local/global IP Address or public device URL (if enabled), and open it in your browser.

# How to Run Tests
To run the Unit tests for the React app, run this command in the Terminal:

`npm test`

# How to Deploy
To deploy the Plower app to Raspberry Pi locally, run this command in the Terminal:

`balena push Plower`


# How to Use Plower
- The Plower app's home page displays the list of your plants.
- Last added plants displayed first.
- The humidity updates when the app starts and every half an hour.
- The color of the humidity bar depends on the humidity level.
- When the last updated humidity increased by 10 % and more, the last watered date and time will be updated.
- To create a new plant, click on `+` button, enter the name of the plant, and press Enter/click `+`.
- If there are available sensors, the first one will be assigned to your plant.
- Place the assigned sensor in your plant's pot.

# Home Page
<img width="1103" alt="image" src="https://user-images.githubusercontent.com/89826596/162479155-426c3042-ac54-4e81-b280-f252f5f6fc90.png">

# Add Plant
<img width="755" alt="image" src="https://user-images.githubusercontent.com/89826596/161615618-690d6bc8-6feb-4398-a34d-eab689ad7e6c.png">

# Usefull Resources
- https://www.youtube.com/watch?v=tFefuPWqXT4
- https://www.youtube.com/watch?v=UWbeHqyzP-c
- https://www.balena.io/docs/learn/getting-started/raspberrypi3/nodejs/
- https://www.balena.io/docs/learn/develop/hardware/i2c-and-spi/
- https://github.com/fivdi/i2c-bus
- https://www.npmjs.com/package/ads1115
