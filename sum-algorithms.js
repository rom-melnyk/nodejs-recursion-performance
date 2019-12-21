function sumRecursionClassic(n) {
  return n === 0
    ? 0
    : n + sumRecursionClassic(n - 1);
}

function sumRecursionTailOptimized(n, accum = 0) {
  return n === 0
    ? accum
    : sumRecursionTailOptimized(n - 1, n + accum);
}

function sumMemoizedRecursion(n) {
  if (n === 0) return 0;

  // Memoization
  if (!sumMemoizedRecursion._cache) sumMemoizedRecursion._cache = new Map();
  let result = sumMemoizedRecursion._cache.get(n);
  if (!result) {
    result = n + sumMemoizedRecursion(n - 1);
    sumMemoizedRecursion._cache.set(n, result);
  }

  return result;
}

function sumLoop(n) {
  let result = n;
  while (n > 0) result += (--n);
  return result;
}

module.exports = {
  sumRecursionClassic,
  sumRecursionTailOptimized,
  sumMemoizedRecursion,
  sumLoop,
};
