// ##################################################
// What is recursion?
// ##################################################

// Recursion is a programming pattern that is useful in situations where a task can be
// split into several tasks of the same kind, but simpler. Or when a task can be simplified
// into an easy action plus a simpler variant of the same task, or to deal with certain
// data structures.

// When a function calls itself, that is called recursion.

// For example, a function that raises x to a natural power of n, meaning x is multiplied by
// itself n amount of times. there are two ways to do this:

// 1. Iterative thinking: the for loop:
function pow(x, n) {
  let result = 1;

  // multiply result by x n times in the loop
  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}

alert(pow(2, 3)); // 8 (2 x 2 x 2)

// 2. Recursive thinking: simplify the task and call self:
function power(x, n) {
  if (n == 1) {
    return x;
  } else {
    return x * power(x, n - 1);
  }
}

alert(power(2, 3)); // 8 (2 x 2 x 2)

// The recursive variant is fundamentally different:

// When power(x, n) is called, the execution splits into two branches:
// 1. if n == 1 = x | 2. else = x * power(x, n - 1)

// If n == 1, is called the base of recursion because it immediately produces the obvious result
// power(x, 1) = x.

// Otherwise, power(x, n) can be represented as x * power(x, n - 1).
// This is called a recursive step (in maths this would be x^n = x * x^n-1), the task is
// transformed into a simpler action (multiply by x) and a simpler call of the same task
// (power with lower n).
// Next steps simplify it further and further until n reaches 1.

// Basically, power recursively calls itself until n == 1.
// For example to calculate power(2, 4), the following steps are done:
// 1. power(2, 4) = 2 * power(2, 3)
// 2. power(2, 3) = 2 * power(2, 2)
// 3. power(2, 2) = 2 * power(2, 1)
// 4. power(2, 1) = 2
// Recursion reduces a function call to a simpler one, and so on until the result is obvious
