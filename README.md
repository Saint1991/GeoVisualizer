# GeoVisualizer

This is an application for visualizing trajectories on Google Map.
Load trajectory file by "Add" on the right side.

Supported file format is below.

## oplt
oplt is CSV that consists of (latitude, longitude, timestamp) each line as below.
Note that the file extension should be `.oplt`

```
35.6579,139.6980,2018-02-06 12:00:00
35.6598,139.7024,2018-02-06 12:04:00

```

## node
node is CSV that consists of (latitude, longitude) each line as below.
Note that the file extension should be `.node`

```
35.6579,139.6980
35.6598,139.7024

```

## run in Docker container

You can start the app as following:
```
$ docker-compose up
```

You'll see it on your browser.
`http://$(ip of your docker machine):8080`

## License

This application is opened under the MIT License, see LICENSE.txt