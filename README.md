Image Thresholding
==================

There are 6 types of Image Thresholding methods:
* Histogram shape-based
  The peaks, valleys and curvatures of the smoothed histogram are analyzed.
* Cluster-based
  The gray-level samples are clustered in two parts as background and foreground (object), or alternately are modeled as a mixture of two Gaussians.
* Entropy-based
  Result in algorithms that use the entropy of the foreground and background regions, the cross-entropy between the original and binarized image, etc
* Object Attribute-based
  Search a measure of similarity between the gray-level and the binarized images, such as fuzzy shape similarity, edge coincidence, etc.
* Spatial
  Use higher-order probability distribution and/or correlation between pixels
* Local
Adapt the threshold value on each pixel to the local image characteristics. In these methods, a different T is selected for each pixel in the image.

