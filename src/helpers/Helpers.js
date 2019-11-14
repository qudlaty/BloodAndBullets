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
