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

  var getWeight = function(histogram, start, end) {
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
    var leftWeight = getWeight(histogram.g, start, mid + 1);
    var rightWeight = getWeight(histogram.g, mid + 1, end + 1);
    /* console.log("start ", start, " end ", end, " mid ", mid, " leftWeight ", leftWeight, " rightWeight ", rightWeight); */
    /* console.log(histogram); */
    while(start <= end) {
      console.log("start ", start);
      console.log("end ", end);
      console.log("mid ", mid);
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

  var testImgData = [0, 0, 1, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5];
  console.log(bht(testImgData));
}(this));
