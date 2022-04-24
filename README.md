# Fetch Machine Learning Engineer Pixel Coordinate Calculator
Express web server for calculating pixel locations given corner coordinates and image dimensions.
## Usage
Download the docker image

`docker pull teenybrandon/fetch`

Once the image has been pulled successfully, start a container

`docker run -d -p 3000:3000 -p 4200:4200 teenybrandon/fetch`

A web server will start on port 3000. There are two ways that you can make requests:
### Direct requests
Make http POST requests directly to the server. You can do this from your own machine (you don't need to do it from within the docker container). The format of the request should contain a json body formatted as follows:
`{"corner_points": <corner_points>, "dimensions": <dimensions>}`. 

`corner_points` is a 4x2 array containing the 4 points of the corners of the rectangle.
`dimensions` is an array of length 2 containing the dimensions of the image [width, height]

Example request using curl: `curl -d '{"corner_points": [[1, 1], [1, 3], [3, 1], [3, 3]], "dimensions": [3, 3]}'`

### Through the UI
When the docker container starts, it also spins up an angular UI, running on port 4200. If you enter `localhost:4200` in your browser, it will open up the page. If it doesn't load at first, wait until you see a "Compiled successfully" message in the docker logs.

You'll see boxes where you can enter the height, width and corner points. Enter integers into the height and width boxes, and a 4x2 array of numbers into the corner points box.

When you hit "Calculate" the pixel locations will appear at the bottom of the screen. Note that this output (unlike what the HTTP request returns) is formatted so that the points match the layout of the coordinate system. Basically `pixels[0][0]` is in the bottom left corner, and `pixels[height - 1][width - 1]` is in the top right corner, for visual purposes.