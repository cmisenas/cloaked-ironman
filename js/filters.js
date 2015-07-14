;(function(exports) {
  function Filters(cvs) {
    this.canvas = cvs;
  }

  var calculateGray = function(pixel){
    return ((0.3 * pixel.r) + (0.59 * pixel.g) + (0.11 * pixel.b));
  };

  Filters.prototype.grayscale = function() {
    var imgDataCopy = this.canvas.getCurrImgData(),
        that = this,
        grayLevel;

    console.time('Grayscale Time');
    this.canvas.runImg(null, function(current) {
      grayLevel = calculateGray(that.canvas.getPixel(current, imgDataCopy));
      that.canvas.setPixel(current, grayLevel, imgDataCopy);
    });
    console.timeEnd('Grayscale Time');

    return imgDataCopy;
  };

  Filters.prototype.invertColors = function() {
    var imgDataCopy = this.canvas.getCurrImgData(),
        that = this,
        pixel;

    console.time('Invert Colors Time');
    this.canvas.runImg(null, function(current) {
      pixel = that.canvas.getPixel(current, imgDataCopy);
      that.canvas.setPixel(current, {r: 255 - pixel.r, g: 255 - pixel.g, b: 255 - pixel.b}, imgDataCopy);
    });
    console.timeEnd('Invert Colors Time');

    return imgDataCopy;
  };

  exports.Filters = Filters;
}(this));
