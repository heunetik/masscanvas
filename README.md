# MassCanvas
A collaborative Canvas using express and socket.&#8203;io

#### Features:
- multi-user support with real time drawing
- different stroke color per client
- support for touch devices
- scroll the mousewheel up or down to increase/decrease the brush size by 1px
- hold shift while scrolling to resize the brush by 10px instead of 1px

#### Installation:

```sh
$ git clone https://github.com/heunetik/masscanvas.git
$ cd masscanvas
$ npm install
$ node server.js
```

#### Configuration

To change the port, create a `.env` file in the root directory, and set the `PORT` variable to your desired port number.

ex.:
```
PORT=1337
```

This will set the port to `1337`.

#### Viewing the app locally

Navigate to `http://localhost:3000` (or the port that you configured using the `.env` file) and use the mouse to draw on the canvas.

#### Demo
[Available on Heroku](https://masscanvas.herokuapp.com/)