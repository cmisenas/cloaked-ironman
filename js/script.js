;(function(exports) {
  var canvas = new Canvas('canvas'),
      filters = new Filters(canvas);

  var bhtBtn      = document.getElementById('bht'),
      otsuBtn     = document.getElementById('otsu'),
      fastOtsuBtn = document.getElementById('fastotsu'),
      istBtn      = document.getElementById('ist'),
      clusterBtn   = document.getElementById('cluster-btn'),
      entropyBtn   = document.getElementById('entropy-btn'),
      objectBtn   = document.getElementById('object-btn'),
      spatialBtn  = document.getElementById('spatial-btn'),
      localBtn    = document.getElementById('local-btn');

  var grayBtn     = document.getElementById('gray'),
      invertBtn   = document.getElementById('invert'),
      resetBtn    = document.getElementById('reset');

  function checkForImg() {
    var params = window.location.search;
    var imgFile;
    if (params !== '' && params.indexOf("img=") > -1) {
      imgFile = params.substring(params.indexOf("img=") + 4);
      canvas.loadImg('uploads/' + imgFile);
    }
  }

  bhtBtn.onclick = function() {
    console.log(Thresh.bht(canvas));
  };

  otsuBtn.onclick = function() {
    console.log(Thresh.otsu(canvas));
  };

  fastOtsuBtn.onclick = function() {
    console.log(Thresh.fastOtsu(canvas));
  };

  istBtn.onclick = function() {
    console.log(Thresh.ist(canvas));
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

  grayBtn.onclick = function() {
    canvas.setImgData(filters.grayscale());
  };

  invertBtn.onclick = function() {
    canvas.setImgData(filters.invertColors());
  };

  resetBtn.onclick = function() {
    //put back the original image to the canvas
    canvas.setImgData(canvas.origImg.imgData);
  };

  checkForImg();
}(this));
