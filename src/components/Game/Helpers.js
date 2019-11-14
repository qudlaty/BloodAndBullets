export function resetGivenFieldsOnACollection(collection, ...fieldNames) {
  collection.forEach(
    item => {
      fieldNames.forEach(fieldName => {
        item && (item[fieldName] = false)
      });
    }
  );
}
