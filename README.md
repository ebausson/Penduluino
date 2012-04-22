Penduluino
==========

Le pendule sans nom qui transcende le silence de la musique.

## how to run the player

Use the following command

```
cd player
make server
```

It starts a http server on port 8001 to server static files for the server.

## how to run the server

Use the following command

```
node app.js
```

It run a socket.io server on top 8000, start listening on serial port.
When event are received on serial port, it is broadcasted to all connected
clients.

Use ```appSimulationRandom.js```
to simulate those events at random, instead of reading them on serial post.

```
node appSimulationRandom.js
```
