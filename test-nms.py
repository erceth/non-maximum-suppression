import json
import numpy
import json
import time
NS_PER_SEC = 1e9
# from nms import non_max_suppression_slow as non_max_suppression
from nms import non_max_suppression_fast as non_max_suppression

with open('locations.json', 'r') as f:
  locations = json.load(f)

def convertToNumPy(l):
  return {'name': l[0], 'value': numpy.array(l[1])}


locationsNP = map(convertToNumPy, locations.items())

results = []
totalTime = 0

for location in locationsNP:
  name = location['name']
  val = location['value']
  beforeSize = val[:,0].size
  start_time = time.time()
  pick = non_max_suppression(val, 0.3) # make sure parameters match node version
  totalTime += (time.time() - start_time)
  numberSuppressed = beforeSize - pick[:,0].size
  print(f'file {name} number of boxes suppressed by: {numberSuppressed}')
  results.append({'file': name, 'suppressed': numberSuppressed})

print(f'total non-maximum suppression processing time: {totalTime * NS_PER_SEC} nanoseconds')