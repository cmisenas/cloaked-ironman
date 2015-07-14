;(function(exports){
  /*
   * Balanced Histogram Thresholding
   */
  var bht = function(canvas){
    var histogram = Thresh.help.createHistogram(canvas);
    var start = 0;
    var end = histogram.g.length - 1;
    var mid = parseInt((start + end/2), 10);
    var leftWeight = Thresh.help.histogramSum(histogram.g, start, mid + 1);
    var rightWeight = Thresh.help.histogramSum(histogram.g, mid + 1, end + 1);
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
          mid++;
          rightWeight -= histogram.g[mid];
          leftWeight  += histogram.g[mid];
        }
      }
    }
    return histogram.g[mid];
  };

  /*
   * Otsu's Method
   * See http://www.labbookpages.co.uk/software/imgProc/otsuThreshold.html for a better explanation
   */
  var otsu = function(canvas) {
    // calculate within class variance for each image data value
    // store the results in an array with value's index corresponding to value
    // find the lowest one and get it's index
    var histogram = Thresh.help.createHistogram(canvas);
    var start = 0;
    var end = histogram.g.length - 1;
    var leftWeight, rightWeight,
        leftMean, rightMean,
        leftVariance, rightVariance;
    var withinClassVariances = [];
    var min = Infinity;
    var threshold;

    histogram.g.forEach(function(el, i) {
      leftWeight = Thresh.help.calcWeight(histogram.g, start, i);
      rightWeight = Thresh.help.calcWeight(histogram.g, i, end + 1);
      leftMean = Thresh.help.calcMean(histogram.g, start, i);
      rightMean = Thresh.help.calcMean(histogram.g, i, end + 1);
      leftVariance = Thresh.help.calcVariance(histogram.g, start, i, leftMean);
      rightVariance = Thresh.help.calcVariance(histogram.g, i, end + 1, rightMean);
      withinClassVariances[i] = Thresh.help.calcWithinClassVariance(leftVariance, leftWeight, rightVariance, rightWeight);
      if (withinClassVariances[i] < min) {
        min = withinClassVariances[i];
        threshold = i;
      }
    });

    return {min: min, threshold: threshold};
  };

  var fastOtsu = function(canvas) {
    var histogram = Thresh.help.createHistogram(canvas);
    var start = 0;
    var end = histogram.g.length - 1;
    var leftWeight, rightWeight,
        leftMean, rightMean;
    var betweenClassVariances = [];
    var max = -Infinity, threshold;

    histogram.g.forEach(function(el, i) {
      leftWeight = Thresh.help.calcWeight(histogram.g, start, i);
      rightWeight = Thresh.help.calcWeight(histogram.g, i, end + 1);
      leftMean = Thresh.help.calcMean(histogram.g, start, i);
      rightMean = Thresh.help.calcMean(histogram.g, i, end + 1);
      betweenClassVariances[i] = Thresh.help.calcBetweenClassVariance(leftWeight, leftMean, rightWeight, rightMean);
      if (betweenClassVariances[i] > max) {
        max = betweenClassVariances[i];
        threshold = i;
      }
    });

    return {max: max, threshold: threshold};
  };

  /*
   * Iterative Selection Thresholding Method
   * 1. select an initial estimate for T
   * 2. group the pixels into 2:
        G1 for pixels with values > T
        G2 for pixels with values <= T
   * 3. compute the average value of G1 and G2
        m1 = average(G1)
        m2 = average(G2)
   * 4. compute T' = (m1 + m2)/2
   * 5. go back to 2 with T' until T' is the same as previous value
        this means value has converged
        or the difference is small enough (compare to predefined var)
   *
   */
  var ist = function(canvas) {
    var histogram = Thresh.help.createHistogram(canvas);
    var start = 0;
    var end = histogram.g.length - 1;
    var mean = Math.round(Thresh.help.calcMean(histogram.g, start, end + 1));
    var meanBelow = Math.round(Thresh.help.calcMean(histogram.g, start, mean));
    var meanAbove = Math.round(Thresh.help.calcMean(histogram.g, mean + 1, end + 1));
    var nMean = Math.round((meanBelow + meanAbove)/2);
    var thresholds = [mean, nMean];
    var i = 1;

    while ((thresholds[i] - thresholds[i - 1]) > 0) {
      mean = thresholds[i];

      meanBelow = Math.round(Thresh.help.calcMean(histogram.g, start, mean));
      meanAbove = Math.round(Thresh.help.calcMean(histogram.g, mean + 1, end + 1));
      nMean = Math.round((meanBelow + meanAbove)/2);
      thresholds.push(nMean);
      i++;
    }
    return thresholds[thresholds.length - 1];
  };

  exports.Thresh.bht = bht;
  exports.Thresh.otsu = otsu;
  exports.Thresh.fastOtsu = fastOtsu;
  exports.Thresh.ist = ist;
}(this));
