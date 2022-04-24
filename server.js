var cors = require('cors');
var express = require('express');
var app = express();

app.use(cors());
app.use(express.json());

app.get('/', function (req, res) {
    res.send('Cute lil server');
});

class Rectangle {
    constructor(cornerPoints) {
        var max_x, max_y, min_x, min_y;
        max_x = Math.max.apply(Math, cornerPoints.map(function(p) {
            return p[0];
        }));
        max_y = Math.max.apply(Math, cornerPoints.map(function(p) {
            return p[1];
        }));
        min_x = Math.min.apply(Math, cornerPoints.map(function(p) {
            return p[0];
        }));
        min_y = Math.min.apply(Math, cornerPoints.map(function(p) {
            return p[1];
        }));
        this.right = max_x;
        this.left = min_x;
        this.top = max_y;
        this.bottom = min_y;
    }
    
    getHeightLen() {
        return this.top - this.bottom;
    }

    getWidthLen() {
        return this.right - this.left;
    }
}

function getPixelLocations(dimensions, cornerPoints) {
    const height = dimensions[0];
    const width = dimensions[1];
    rect = new Rectangle(cornerPoints);
    xPixelSpacing = rect.getWidthLen() / (width - 1);
    yPixelSpacing = rect.getHeightLen() / (height - 1);

    var pixels = new Array(height);
    pixels[0] = new Array(width);
    // fill first row to avoid any multiplication
    pixels[0][0] = [rect.left, rect.bottom];
    for (var j = 1; j < width; j++) {
        pixels[0][j] = [pixels[0][j - 1][0] + xPixelSpacing, rect.bottom]
    }
    // fill the rest of the rows
    for (var i = 1; i < height; i++) {
        pixels[i] = new Array(width);
        var this_height = pixels[i - 1][0][1] + yPixelSpacing;
        pixels[i][0] = [rect.left,this_height] 
        for (var j = 1; j < width; j++) {
            pixels[i][j] = [pixels[i- 1][j][0], this_height];
        }
    }

    return pixels;
}

app.post('/', function (req, res) {
    console.log(req.body);
    res.send(getPixelLocations(req.body.dimensions, req.body.corner_points));
});

app.listen(3000, function() {
    console.log('Server running on port 3000');
});