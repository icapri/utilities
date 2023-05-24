<p align="center">
  <br>
  <img src="/docs/logo.png" alt="Utilitates Logo" width="120px" height="115px"/>
  <h2 align="center">Utility Framework</h1>
</p>
<p align="center"><i>A modern framework intended for conversion, formatting, parsing, validation, and more.</i></p>

## Description

This library contains hundreds of utility methods such as converters, formatters, parsers, validators, etc. necessary for dealing with built-in JavaScript types such as `Array`, `Date`, `Map`, `Number`, `Object`, `Set` and `String`. The names of the abstract classes provided by this library are simply the plural form of the afore-mentioned types i. e. `Dates`, `Maps`, `Numbers`, `Objects`, `Sets` and `Strings`. These abstract classes are only composed of static members (utility methods). The motivation to build this library comes from the fact that often it becomes necessary to install several libraries e. g. one library for validations, another one for dealing with dates, another one for conversions, etc. This sometimes leads to serious performance issues on applications/libraries. `utilitates` does not depend on other libraries, it has its own implementation of each and every utility provided. This enables the developers of this library to continuously refactor and improve the code inside it.

## Installation

Execute the following command from your project directory:
```bash
npm install utilitates
```
and then enjoy using it.

## Usage

This library is simply composed of abstract classes which can be used as follows:

```typescript
import {
  Arrays,
  Dates,
  Maps,
  Numbers,
  Objects,
  Sets,
  Strings,
  Utils
} from 'utilitates';

// Arrays examples:
Arrays.addFirst(["b", "c"], "a"); // ["a", "b", "c"]
Arrays.first(["a", "b", "c"]); // "a"
Arrays.isNotEmpty(["a", "b", "c"]); // true
Arrays.isEmpty([]); // true
Arrays.has(["a", "b", "c"], "a"); // true
Arrays.last(["a", "b", "c"]); // "c"

// Chars examples:
Chars.isAlpha('E'); // true
Chars.isASCII('|'); // true
Chars.isASCIIControl(Chars.BS); // true
Chars.isDigit('9'); // true
Chars.isHinduDigit('१'); // true
Chars.isLetter('我'); // true
Chars.isLetterOrDigit('ぃ'); // true
Chars.isLowerCase('ы'); // true
Chars.isLowSurrogate('\uDFFF'); // true
Chars.isPersianDigit('۴'); // true
Chars.isSurrogatePair('\ud801\udbff', '\udc9f'); // false
Chars.isUpperCase('Б'); // true
Chars.isWhitespace('\t'); // true

// Dates examples:
Dates.isAfter(Dates.now, "2023-05-11T23:20:12");
Dates.addDays(Dates.now, 12);
Dates.parseISO("2023-05-11T23:20");
Dates.isBetween("2023-05-11", "2023-05-10", "2023-05-12");
Dates.daysDifference("2023-05-11", "2023-05-10");

// Maps examples:
Maps.isEmpty(new Map()); // true
Maps.isMap([[0, "a"], [1, "b"]]); // false
const map = new Map();
map.set("a", "abc");
map.set("b", false);
map.set("c", 123);
Maps.toObject(map);

// Numbers examples:
Numbers.abs(-1); // 1
Numbers.isInteger(1); // true
Numbers.isNatural(-123); // false
Numbers.isNotNumber(0/0); // true
Numbers.isNumber({}); // false
Numbers.isPrime(2); // true
Numbers.randomInt(1, 8);
Numbers.toString(123); // "123"

// Objects examples:
Objects.deserialize('{"a":2,"b":"abc"}'); // {a: 2, b: "abc"}
Objects.hasProperty({a: true, b: 'abc'}, 'a'); // true
Objects.isNotNull({}); // false
Objects.isObject({}); // true
Objects.omit({ a: !0 }, "a"); // {}
Objects.pick({ a: null, b: true }, "a");
Objects.serialize({a: true}); // "{"a":true}"
Objects.toIterable({ a: 'abc', b: 444, c: true });

// Sets examples:
Sets.isNotEmpty(new Set()); // false
Sets.isSet(undefined); // false
Sets.isWeakSet(new WeakSet()); // true
const set = new Set();
set.add("abc");
Sets.toMap(set);

// Strings examples:
Strings.isNullOrEmpty(""); // true
Strings.normalize("  Lorem  ipsum dolor sit "); // "Lorem ipsum dolor sit"
Strings.isNumerical("12.34"); // true
Strings.hasWhitespace("Lorem\t"); // true
Strings.countMatches("ho ho ho", "ho"); // 3
Strings.decode("2aMgaXMgMyBpbiBBcmFiaWM="); // "٣ is 3 in Arabic"
Strings.encode("\u0663 is 3 in Arabic"); // "2aMgaXMgMyBpbiBBcmFiaWM="
Strings.toTitleCase("jOhN doE"); // John Doe
Strings.toCharArray("🐑🐑🐑"); // ["🐑", "🐑", "🐑"]
Strings.repeat("abc", 5); // "abcabcabcabcabc"
Strings.remove("adefbc", "def"); // "abc"
Strings.reverse("😃😄😁😆🤣"); // "🤣😆😁😄😃"
Strings.toCamelCase("\nAbc  def"); // "abcDef"
Strings.toKebabCase("\nAbc  def"); // "abc-def"
Strings.upperFirst("john Doe"); // "John Doe"

// Utils examples:
Utils.isBoolean(false); // true
Utils.isDefined(false); // true
Utils.isError(new TypeError('abc')); // true
Utils.isFile(new File([], "abc")); // true
Utils.isFunction(() => {}); // true
Utils.isIterable(new Set()); // true
Utils.isNullOrUndefined(undefined); // true
Utils.isPrimitive("abc"); // true
Utils.isPromise(Promise.resolve()); // true
Utils.isUndefined(null); // false
```

## Support

Something isn't working as expected in this library? Feel free to create a GitHub issue.

## Contribution

Please contact me if you would like to contribute to utilitates.

## Roadmap

Latest stable: v1.5.8

## License

Licensed under [the MIT License](https://github.com/icapri/utilities/blob/main/LICENSE).