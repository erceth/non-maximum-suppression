const {min, max} = Math;
module.exports = (foundLocations, overlapThresh) => {
  if (foundLocations.length === 0) {
    return [];
  }

  const pick = [];
  
  foundLocations = foundLocations.map(box => { // TODO: replace with vectorization
    const width = box[2] - box[0];
    const height = box[3] - box[1];
    return {
      x1: box[0],
      y1: box[1],
      x2: box[2],
      y2: box[3],
      width,
      height,
      area: (height + 1) * (width + 1)
    }
  });

  foundLocations.sort((b1, b2) => {
    return b1.y2 - b2.y2;
  });

  while (foundLocations.length > 0) {
    let last = foundLocations[foundLocations.length - 1];
    pick.push(last);
    suppress = [last];

    for (let i = 0; i < foundLocations.length - 1; i ++) {
      const box = foundLocations[i];
      const xx1 = max(box.x1, last.x1)
      const yy1 = max(box.y1, last.y1)
      const xx2 = min(box.x2, last.x2);
      const yy2 = min(box.y2, last.y2)
      const w = max(0, xx2 - xx1 + 1);
      const h = max(0, yy2 - yy1 + 1);
      const overlap = (w * h ) / box.area;
      if (overlap > overlapThresh) {
        suppress.push(foundLocations[i])
      }
    }
    
    foundLocations = foundLocations.filter((box) => {
      return !suppress.find((supp) => {
        return supp === box;
      })
    });
  }
  return pick;
};