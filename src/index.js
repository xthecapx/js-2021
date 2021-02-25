// https://github.com/tc39/proposals/blob/master/finished-proposals.md

// String.prototype.replaceAll (https://github.com/tc39/proposal-string-replaceall)
const str = "Programadores anonimos";

console.log(str.replace("a", "4"));
console.log(str.replace(/a/g, "4"));
console.log(str.replaceAll("a", "4"));

// Promise.any (https://github.com/tc39/proposal-promise-any)

const promise1 = new Promise((_, reject) =>
  setTimeout(
    () => {
      console.log("rejecting promise1");
      reject();
    },
    200,
    "promise1 rejected"
  )
);
const promise2 = new Promise((resolve) =>
  setTimeout(resolve, 100, "prosime2 resolved")
);
const promise3 = new Promise((resolve) =>
  setTimeout(resolve, 500, "promise3 resolved")
);
const promises = [promise1, promise2, promise3];

Promise.any(promises).then((value) => {
  console.log("Promise.any subscription");
  console.log(value);
});

// WeakRefs (https://github.com/tc39/proposal-weakrefs)
// reference to and object it stay in memory as long as the reference exists

const aBigObj = new WeakRef({
  programadores: "Anonimos",
});
let count = 0;

const callback = () => {
  console.log(`\n${count}`)
  console.log('aBigObj: ', aBigObj);
  console.log('typeof: ', typeof aBigObj);
  console.log('value', aBigObj.deref()?.programadores);
  count++;
};

(async function () {
  await new Promise((resolve) => {
    setInterval(() => {
      callback(); // No Gaurantee that "Anonimos" is printed
      resolve();
    }, 1000);
  });
})();

// 1.creating weak references to objects with the WeakRef class
// 2. running user-defined finalizers after objects are garbage-collected, with the FinalizationRegistry class
// is somebody intersted on running a talk about gargabe collector? This is a Huge complete talk!

// Logical Assignment Operators (https://github.com/tc39/proposal-logical-assignment)

const programadores = true; // change to false

console.log(programadores || "Anonimos");
console.log(programadores && "Anonimos");

const nullVariable = null;
const undefinedVariable = undefined;
console.log(nullVariable ?? "Programadores Anonimos");
console.log(undefinedVariable ?? "Programadores Anonimos");

// 1. "Or Or Equals" (or, the Mallet operator :wink:)
let malletTrue = true;
let malletFalse = false;

console.log("\n Mallet");
malletTrue ||= "Programadores Anonimos"; // true || 'str'
malletFalse ||= "Programadores Anonimos"; // false || 'str'

console.log(malletTrue, malletFalse);

// Real world use:

let songLyric = "Estas escuchando programadores ..."
const errorMessage = 'No Lyric'

if (!songLyric) {
    songLyric = errorMessage
}

console.log('songLyric', songLyric)

let songLyricMallet = "Estas escuchando programadores ..."

songLyricMallet ||= errorMessage

console.log('songLyricMallet', songLyricMallet)


// 2. "And And Equals"
// x &&= y
// x && (x = y)

// if (x) {
//     x = y
// }

let andandTrue = true;
let andandFalse = false;
console.log("\n &&=");
andandTrue &&= "Programadores Anonimos"; // true && 'str'
andandFalse &&= "Programadores Anonimos"; // false && 'str'
console.log(andandTrue, andandFalse);

// Real world use:
const valideForm = (inputValue) => {
    let isFormValid = true;

    if (isFormValid && inputValue !== "") {
      isFormValid = true;
    } else if (isFormValid && inputValue.length > 2) {
      isFormValid = true;
    } else {
      isFormValid = false;
    }

    return isFormValid
}

const valideFormNewWay = (inputValue) => {
    let isFormValid = true;
    isFormValid &&= inputValue !== ""; // valid && inputValue !== ''
    isFormValid &&= inputValue.length > 2; // valid && inputValue.length > 2

    return isFormValid
}

console.log('valideForm', valideForm("Programdores Anonimos"))
console.log('valideFormNewWay', valideFormNewWay("Programdores Anonimos"))
console.log('valideFormNewWay', valideFormNewWay("Pr"))

// 3. "QQ Equals"
let qqNull = null;
let qqUndefined = undefined;
let qqFalse = false;

console.log("\n ??=");

qqNull ??= "Programadores Anonimos";
qqUndefined ??= "Programadores Anonimos";
qqFalse ??= "Programadores Anonimos";

console.log(qqNull, qqUndefined, qqFalse);

let large = null;

if (large === null || large === undefined) {
  large = "Programadores Anonimos";
}

// Real world use:

const podcastGenerator = (audio) => {
    audio.duration ??= 100
    audio.speed ??= 25

    console.log(audio)
}

podcastGenerator({})
podcastGenerator({ duration: null })
podcastGenerator({ duration: 30000 })

// Numeric separators (https://github.com/tc39/proposal-numeric-separator)

console.log(10000000000);
console.log(10_000_000_000);
