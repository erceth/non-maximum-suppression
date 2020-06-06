These test depend on npm opencv4nodejs which depends on opencv. You will need to tell opencv4nodejs where opencv is installed on your computer. The easiest way is to edit the properties `opencvLibDir` and `opencvBinDir` in the opencv4nodejs object in the package.json file.

 The python file nms.py is the gold standard non-maximum-suppression is built from. Accuracy and speed is compared to nms.py.

 locations.json - data stored