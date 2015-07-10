;(function(exports) {
  var histogramBtn  = document.getElementById('histogram-btn'),
      clusterBtn    = document.getElementById('cluster-btn'),
      entropyBtn    = document.getElementById('entropy-btn'),
      objectBtn     = document.getElementById('object-btn'),
      spatialBtn    = document.getElementById('spatial-btn'),
      localBtn      = document.getElementById('local-btn'),
      invertBtn = document.getElementById('invert'),
      resetBtn = document.getElementById('reset');

  function checkForImg() {
    var params = window.location.search;
    var imgFile;
    if (params !== '' && params.indexOf("img=") > -1) {
      imgFile = params.substring(params.indexOf("img=") + 4);
      canvas.loadImg('uploads/' + imgFile);
    }
  }

  histogramBtn.onclick = function() {
  };

  clusterBtn.onclick = function() {
  };

  entropyBtn.onclick = function() {
  };

  objectBtn.onclick = function() {
  };

  spatialBtn.onclick = function() {
  };

  localBtn.onclick = function() {
  };

  invertBtn.onclick = function() {
    canvas.setImgData(filters.invertColors());
  };

  resetBtn.onclick = function() {
    canvas.setImgData(canvas.origImg.imgData);//put back the original image to the canvas
  };

  checkForImg();
}(this));
