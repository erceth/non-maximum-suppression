# this file generates locations.json which is already included in this repo

import cv2
import numpy as np
from imutils import paths # replace with generic python
import imutils
import json

jsonData = {}
hog = cv2.HOGDescriptor()
hog.setSVMDetector(cv2.HOGDescriptor_getDefaultPeopleDetector())

for imagePath in paths.list_images('./images'):
  image = cv2.imread(imagePath)
  image = imutils.resize(image, width=min(400, image.shape[1]))
  # detect people in the image
  (rects, weights) = hog.detectMultiScale(image, winStride=(4, 4),
    padding=(8, 8), scale=1.05)
    
  for (x, y, w, h) in rects:
    jsonData.setdefault(imagePath, []).append([
      int(x), int(y), int(x) + int(w), int(y) + int(h)
    ])
    

print(jsonData)
with open('locations.json', 'w', encoding='utf8') as f:
  json.dump(jsonData, f)
