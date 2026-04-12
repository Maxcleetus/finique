const reviews = [{ id: 1 }, { id: 2 }];
const safeReviews = Array(3).fill(reviews).flat();
console.log(safeReviews.length);
console.log(JSON.stringify(safeReviews));
