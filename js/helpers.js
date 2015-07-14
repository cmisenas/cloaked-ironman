;(function(exports) {
  var help = {};

  help.createHistogram = function(img) {
    var histogram = { g: [] },
        range = 256,
        total = 0;
    while(range--) histogram.g[range] = 0;
    img.forEach(function(index, el) {
      // el is the pixel value
      // imgData is assumed to be a simplified array
      // with each pixel signifying the value of a
      // pixel's rgb (meaning the image is grayscale)
      histogram.g[el]++;
      total++;
    });
    histogram.length = total;
    return histogram;
  };

  help.histogramSum = function(histogram, start, end) {
    var weight = 0;
    // end is non-inclusive
    for (var i = start; i < end; i++) {
      weight += histogram[i];
    }
    return weight;
  };

  // end is non-inclusive
  help.calcWeight = function(histogram, s, e) {
    var total = histogram.reduce(function(i, j){ return i + j; }, 0);
    var partHist = (s === e) ? [histogram[s]] : histogram.slice(s, e);
    var part = partHist.reduce(function(i, j){ return i + j; }, 0);
    return parseFloat(part, 10)/total;
  };

  help.calcMean = function(histogram, s, e) {
    var partHist = (s === e) ? [histogram[s]] : histogram.slice(s, e);
    var val = total = 0;
    partHist.forEach(function(el, i){
      val += ((s + i) * el);
      total += el;
    });
    return parseFloat(val, 10)/total;
  };

  help.calcVariance = function(histogram, s, e, mean) {
    var partHist = (s === e) ? [histogram[s]] : histogram.slice(s, e);
    var squaredDiffs = total = 0;
    var diff, sqr;
    partHist.forEach(function(el, i){
      diff = (s + i) - mean;
      sqr = diff * diff;
      squaredDiffs += (sqr * el);
      total += el;
    });
    return parseFloat(squaredDiffs, 10)/total;
  };

  help.calcWithinClassVariance = function(variance1, weight1, variance2, weight2){
    return (weight1 * variance1) + (weight2 * variance2);
  };

  help.calcBetweenClassVariance = function(weight1, mean1, weight2, mean2) {
    return weight1 * weight2 * (mean1 - mean2) * (mean1 - mean2);
  };

  exports.Thresh = exports.Thresh || {}
  exports.Thresh.help = help;
}(this));
