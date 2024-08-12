
class ListHelper{
 async filter(collection, predicate) {
    const result = [];
    for (const element of collection) {
      if (predicate(element)) {
        result.push(element);
      }
    }
    return result;
  }
}
module.exports = ListHelper