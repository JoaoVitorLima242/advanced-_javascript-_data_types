const assert = require("assert");

function* calculation(x, y) {
  yield x * y;
}

function* main() {
  yield "Hello";
  yield "-";
  yield "World";
  yield* calculation(54, 43);
}

const generator = main();

assert.deepStrictEqual(generator.next(), { value: "Hello", done: false });
assert.deepStrictEqual(generator.next(), { value: "-", done: false });
assert.deepStrictEqual(generator.next(), { value: "World", done: false });
assert.deepStrictEqual(generator.next(), { value: 2322, done: false });
assert.deepStrictEqual(generator.next(), { value: undefined, done: true });

// console.log('Array.from', Array.from(main()))
assert.deepStrictEqual(Array.from(main()), ["Hello", "-", "World", 2322]);

// ---- async iterators -----

const { readFile, stat, readdir } = require("fs/promises");

// function* promisified() {
//   const file =  readFile(__filename);
//   yield { file: file.toString()}
// }

async function* systemInfo() {
  const file = await readFile(__filename);
  yield { file: file.toString() };

  const { size } = await stat(__filename);
  yield { size };

  const dir = await readdir(__dirname);
  yield { dir };
}

// console.log('promisified', [...promisified()])
// Promise.all([...promisified()]).then((results) => console.log(results));

// (async () => {
//   for await (const result of [...promisified()]) {
//     console.log("for await", result.toString());
//   }
// })();

(async () => {
  for await (const result of systemInfo()) {
    console.log("systemInfo", result);
  }
})();
