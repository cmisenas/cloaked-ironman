;(function(exports){
  var createHistogram = function(imgData) {
    var histogram = { g: [] },
        total = 0;
    imgData.forEach(function(el) {
      // el is the pixel value
      // imgData is assumed to be a simplified array
      // with each pixel signifying the value of a
      // pixel's rgb (meaning the image is grayscale)
      if (!!histogram.g[el]) {
        histogram.g[el]++;
      } else {
        histogram.g[el] = 1;
      }
      total++;
    });
    histogram.length = total;
    return histogram;
  }

  var histogramSum = function(histogram, start, end) {
    var weight = 0;
    // end is non-inclusive
    for (var i = start; i < end; i++) {
      weight += histogram[i];
    }
    return weight;
  }

  /*
   * Balanced Histogram Thresholding
   */
  var bht = function(imgData){
    var histogram = createHistogram(imgData);
    var start = 0;
    var end = histogram.g.length - 1;
    var mid = parseInt((start + end/2), 10);
    var leftWeight = histogramSum(histogram.g, start, mid + 1);
    var rightWeight = histogramSum(histogram.g, mid + 1, end + 1);
    while(start <= end) {
      if (rightWeight > leftWeight) {
        rightWeight -= histogram.g[end--];

        if (parseInt((start + end)/2, 10) < mid) {
          rightWeight += histogram.g[mid];
          leftWeight  -= histogram.g[mid];
          mid--;
        }
      } else if (leftWeight >= rightWeight )  {
        leftWeight -= histogram.g[start++];

        if (parseInt((start + end)/2, 10) >= mid) {
          rightWeight -= histogram.g[mid + 1];
          leftWeight  += histogram.g[mid + 1];
          mid++;
        }
      }
    }
    return histogram.g[mid];
  };

  var testImgData1 = [0, 0, 1, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5];
  console.log(bht(testImgData1));

  /*
   * Otsu's Method
   * See http://www.labbookpages.co.uk/software/imgProc/otsuThreshold.html for a better explanation
   */

  // end is non-inclusive
  var calcWeight = function(histogram, s, e) {
    var total = histogram.reduce(function(i, j){ return i + j; }, 0);
    var partHist = (s === e) ? [histogram[s]] : histogram.slice(s, e);
    var part = partHist.reduce(function(i, j){ return i + j; }, 0);
    return parseFloat(part, 10)/total;
  };

  var calcMean = function(histogram, s, e) {
    var partHist = (s === e) ? [histogram[s]] : histogram.slice(s, e);
    var val = total = 0;
    partHist.forEach(function(el, i){
      val += ((s + i) * el);
      total += el;
    });
    return parseFloat(val, 10)/total;
  };

  var calcVariance = function(histogram, s, e, mean) {
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

  var calcWithinClassVariance = function(variance1, weight1, variance2, weight2){
    return (weight1 * variance1) + (weight2 * variance2);
  };

  var otsu = function(imgData) {
    // calculate within class variance for each image data value
    // store the results in an array with value's index corresponding to value
    // find the lowest one and get it's index
    var histogram = createHistogram(imgData);
    var start = 0;
    var end = histogram.g.length - 1;
    var leftWeight, rightWeight,
        leftMean, rightMean,
        leftVariance, rightVariance;
    var withinClassVariances = [];
    var min = Infinity;
    var threshold;

    histogram.g.forEach(function(el, i) {
      leftWeight = calcWeight(histogram.g, start, i);
      rightWeight = calcWeight(histogram.g, i, end + 1);
      leftMean = calcMean(histogram.g, start, i);
      rightMean = calcMean(histogram.g, i, end + 1);
      leftVariance = calcVariance(histogram.g, start, i, leftMean);
      rightVariance = calcVariance(histogram.g, i, end + 1, rightMean);
      withinClassVariances[i] = calcWithinClassVariance(leftVariance, leftWeight, rightVariance, rightWeight);
      if (withinClassVariances[i] < min) {
        min = withinClassVariances[i];
        threshold = i;
      }
    });

    return {min: min, threshold: threshold};
  };

  var calcBetweenClassVariance = function(weight1, mean1, weight2, mean2) {
    return weight1 * weight2 * (mean1 - mean2) * (mean1 - mean2);
  };

  var fastOtsu = function(imgData) {
    var histogram = createHistogram(imgData);
    var start = 0;
    var end = histogram.g.length - 1;
    var leftWeight, rightWeight,
        leftMean, rightMean;
    var betweenClassVariances = [];
    var max = -Infinity, threshold;

    histogram.g.forEach(function(el, i) {
      leftWeight = calcWeight(histogram.g, start, i);
      rightWeight = calcWeight(histogram.g, i, end + 1);
      leftMean = calcMean(histogram.g, start, i);
      rightMean = calcMean(histogram.g, i, end + 1);
      betweenClassVariances[i] = calcBetweenClassVariance(leftWeight, leftMean, rightWeight, rightMean);
      if (betweenClassVariances[i] > max) {
        max = betweenClassVariances[i];
        threshold = i;
      }
    });

    return {max: max, threshold: threshold};
  };

  var testImgData2 = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5];
  var histogram2 = createHistogram(testImgData2);

  console.log(otsu(testImgData2));
  console.log(fastOtsu(testImgData2));

}(this));
