const assert = require('assert');
const {
  sumRecursionClassic,
  sumRecursionTailOptimized,
  sumMemoizedRecursion,
  sumLoop,
} = require('./sum-algorithms');

[
  [sumRecursionClassic, 'Classic recursion'],
  [sumRecursionTailOptimized, 'Recursion with tail call optimization'],
  [sumMemoizedRecursion, 'Recursion with memoization'],
  [sumLoop, 'Classic loop']
].forEach(([method, name]) => {
  console.log(`\n${name}:`);
  [[0, 0], [5, 15], [100, 5050]].forEach(([n, expected]) => {
    const result = method(n);
    assert(result === expected, `Failed calculating sum(${n}): expected ${expected} but got ${result}`);
    console.log(`  sum(${n}) = ${result}`);
  });
});

console.log('\nAll tests are ok.\n');
