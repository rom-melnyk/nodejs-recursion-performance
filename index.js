const {
  sumRecursionClassic,
  sumRecursionTailOptimized,
  sumMemoizedRecursion,
  sumLoop,
} = require('./sum-algorithms');

/**
 * @typedef Runtime {
 *   cpuSystem: number,
 *   cpuUser: number,
 *   rss: number,
 *   heapTotal: number,
 *   heapUsed: number,
 *   external: number,
 * }
 */

/**
 * @return {Runtime}
 */
function calculateRuntime(subject, times) {
  const startCpuUsage = process.cpuUsage();
  const startMemoryUsage = process.memoryUsage();

  while (--times >= 0) subject();

  const endMemoryUsage = process.memoryUsage();
  const endCpuUsage = process.cpuUsage(startCpuUsage);
  const memoryUsage = Object.keys(startMemoryUsage)
    .map((key) => [key, endMemoryUsage[key] - startMemoryUsage[key]])
    .reduce((usage, [key, value]) => ({ ...usage, [key]: value }), {});

  return {
    cpuSystem: endCpuUsage.system,
    cpuUser: endCpuUsage.user,
    ...memoryUsage
  };
}

const runtimeResults =
  [
    [sumLoop, 'Classic loop'],
    [sumRecursionClassic, 'Classic recursion'],
    [sumRecursionTailOptimized, 'Recursion with tail call optimization'],
    [(n) => {
      delete sumMemoizedRecursion._cache; // Ensure the 2nd+ run of memoized method does not cheat
      sumMemoizedRecursion(n);
    }, 'Recursion with memoization (1st run)'],
    [sumMemoizedRecursion, 'Recursion with memoization (exploiting memoization)'],
  ]
    .map(([method, name]) => {
      console.log(`Calculating runtime results for "${name}"...`);
      return [
        name,
        // Recursion of bigger depth might cause `Maximum call stack size exceeded`
        calculateRuntime(() => method(1e3), 1e6),
      ];
    });

const runtimeKeys = Object.keys(runtimeResults[0][1]);

console.log('\nAll calculations are done (CSV):\n');
console.log(['Name', ...runtimeKeys].join(','));
console.log(
  runtimeResults
    .map(([name, runtime]) => {
      return [
        name,
        ...runtimeKeys.map((key) => runtime[key])
      ].join(',')
    })
    .join('\n')
);

console.log('\n');
