export function resetGivenFieldsOnACollection(collection, ...fieldNames) {
  collection.forEach(
    item => {
      fieldNames.forEach(fieldName => {
        item && (item[fieldName] = false)
      });
    }
  );
}

export function getNumberWithinBoundaries(value, min, max) {
  if( value < min) value = min;
  if( value > max) value = max;
  return value;
}

export function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function calculateAngle(x, y){
  let angle;
  if(y >= 0) {
    angle = - Math.atan(
      x/y
    ) * (180/Math.PI);
  } else if(y < 0) {
    angle = (180/Math.PI) *
      (
        Math.atan(
          x/-y
        ) + Math.PI
      )
  }
  return angle;
}

export function calculateDistance(x,y) {

  return Math.sqrt(
    Math.pow(x, 2) + Math.pow(y, 2)
  );
}
