# Non-Maximum Suppression

The non-maximum suppression algorithm implemented in node.js. Built to work with opencv4nodejs.

## Summary of files:
 * nms.py: Code from the pyimagesearch website. The whole purpose of this repo is to make a node version of this code
 * nms.js: The node version of nms.py. An algorithm that runs non maximum suppression.
 * generate-locations.py: runs openCV pedestrian detection on all the images in images folder and outputs to locations.json. Running this script is not required because locations.json is already included in the repo. If you would like to run this script (for instance on a different set of images), it requires opencv4nodejs which depends on openCV. To run this script you will need to tell opencv4nodejs where opencv is installed on your computer. The easiest way is to edit the properties `opencvLibDir` and `opencvBinDir` in the opencv4nodejs object in the package.json file.
 * test-nms.py: A python script that reads the locations from locations.json and calls non-maximum suppression using nms.py. Used as a standard to compare results.
 * test-nms.js: A node script that reads the locations from locations.json and calls non-maximum suppression using nms.js. Used to verify nms.js works correctly. Compare the output of test-nms.js to the output of test.nms.py.