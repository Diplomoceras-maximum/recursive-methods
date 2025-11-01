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

// ##################################################
// How do recursive calls work?
// ##################################################

// The informationabout the proces of execution of a running function is stored in its
// execution context.

// The execution content is the interal data structure that contains details about the
// execution of a function: where the control flow is now, the current variables, the
// value of "this", and other details.

// One function call has exactly one execution context associated with it.
// When a function makes a nested call, the following happens:
// #. The current function is paused.
// #. The execution context associated with it is remembered in a special data structure
// called execution context stack.
// #. The nested call executes.
// #. After it ends, the old execution context is retrieved from the stack, and the
// outer function is resumed from where it stopped.

// Using power(2, 3) as an example:

// power(2, 3):
// In the beginning of the call power(2, 3) the execution context will store variables
// x = 2, n = 3, the execution flow is at line 1 of the function.
// This can be written as Context: { x: 2, n: 3, at line 1} call: power(2, 3).
// The condition n == 1 is false, so the flow continues into the second branch of if.
// The context of the flow is now: Context { x: 2, n: 3, at line 5} call: power(2, 3).
// To calculate x * power(x, n - 1), a subcall of power with the new arguments power(2, 2) is made.

// power(2, 2):
// To do a nested call, JS remembers the current execution context in the execution content
// stack.
// Here power is called again, but the process is the same as before: The current context is
// “remembered” on top of the stack. The new context is created for the subcall. When the subcall
// is finished – the previous context is popped from the stack, and its execution continues.
// The context stack now looks like this:
// Context: { x: 2, n: 2, at line 1 } power(2, 2)
// Context: { x: 2, n: 3, at line 5 } power(2, 3)
// The new current execution context is on top, and previous remembered contexts are below.
// When the subcall is finished – it is easy to resume the previous context, because it keeps
// both variables and the exact place of the code where it stopped.

// power(2, 1):
// The process repeats: a new subcall is made at line 5, now with arguments x=2, n=1.
// A new execution context is created, the previous one is pushed on top of the stack:
// Context: { x: 2, n: 1, at line 1 } power(2, 1)
// Context: { x: 2, n: 2, at line 5 } power(2, 2)
// Context: { x: 2, n: 3, at line 5 } power(2, 3)
// There are 2 old contexts now and 1 currently running for power(2, 1).

// The exit:
// During the execution of pow(2, 1), unlike before, the condition n == 1 is truthy, so the
// first branch of if works.
// There are no more nested calls, so the function finishes, returning 2.
// As the function finishes, its execution context is not needed anymore, so it’s removed
// from the memory. The previous one is restored off the top of the stack:
// Context: { x: 2, n: 2, at line 5 } power(2, 2)
// Context: { x: 2, n: 3, at line 5 } power(2, 3)
// The execution of pow(2, 2) is resumed. It has the result of the subcall power(2, 1),
// so it also can finish the evaluation of x * power(x, n - 1), returning 4. Then the
// previous context is restored:
// Context: { x: 2, n: 3, at line 5 } power(2, 3)
// When it finishes, the result of power(2, 3) = 8.
// The recursion depth in this case was: 3.
// The recursion depth equals the maximal number of context in the stack.

// ##################################################
// Recursive traversals
// ##################################################

// Example:
let company = {
  sales: [
    {
      name: "John",
      salary: 1000,
    },
    {
      name: "Alice",
      salary: 1600,
    },
  ],

  development: {
    sites: [
      {
        name: "Peter",
        salary: 2000,
      },
      {
        name: "Alex",
        salary: 1800,
      },
    ],

    internals: [
      {
        name: "Jack",
        salary: 1300,
      },
    ],
  },
};

// In this example, the company has departments:
// #. A department may have an array of staff, for example: sales department has 2 employees.
// #. Or a department may split into subdepartments, like development has two branches:
// sites and internals, each has their own staff.
// #. It is also possible that when a subdepartment grows, it devides into subsubdepartments
// or teams.

// What if we want a function to get the sum of all salaries? How is that done?

// An iterative approach to this is not easy as the structure is not simple.
// Too many loops and subloops would be needed (3 - 4 nested subloops), this becomes
// ugly and hard to read.

// Recursion is the better approach.
// When the function gets a department to sum, there are two possible cases:
// 1. Either its a "simple" deaprtment with an array of people - done in a single loop.
// 2. Or it's an object with n subdepartments - then you need to make n recursive calls
// to get the sum of each of the dubdepartments and combine the results.

// The 1st case is the base of recursion, the trivial case, when you get an array.
// The 2nd case when you get an object is the recursive step. A complex task is split
// into subtasks for smaller departments, they may split again, but the split will eventually
// finish at 1.

// The algorithm:
function sumSalaries(department) {
  if (Array.isArray(department)) {
    // case (1)
    return department.reduce((prev, current) => prev + current.salary, 0); // sum the array
  } else {
    // case (2)
    let sum = 0;
    for (let subdepartment of Object.values(department)) {
      sum += sumSalaries(subdepartment); // recursively call for subdepartments, sum the results
    }
    return sum;
  }
}

alert(sumSalaries(company)); // 7700
