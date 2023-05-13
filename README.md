<p align="center">
  <br>
  <img src="/docs/logo.png" alt="Utilitates Logo" width="120px" height="115px"/>
  <h2 align="center">Utilitates Framework</h1>
</p>
<p align="center"><i>A framework intended for conversion, formatting, parsing, validation, and more.</i></p>

## Description

This library contains utilities for built-in JavaScript classes such as
`Array`, `Date`, `Map`, `Number`, `Object`, `Set` and `String`. To keep it simple, these utility classes are simply called `Arrays`,
`Dates`, `Maps`, `Numbers`, `Objects`, `Sets` and `Strings` and are only
composed of static members (utility methods).

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
} from 'utilitates'

// Arrays examples:
Arrays.addFirst(["b", "c"], "a") // ["a", "b", "c"]
Arrays.first(["a", "b", "c"]) // "a"
Arrays.isNotEmpty(["a", "b", "c"]) // true
Arrays.isEmpty([]) // true
Arrays.has(["a", "b", "c"], "a") // true
Arrays.last(["a", "b", "c"]) // "c"

// Dates examples:
Dates.isAfter(Dates.now, "2023-05-11T23:20:12")
Dates.addDays(Dates.now, 12)
Dates.parseISO("2023-05-11T23:20")
Dates.isBetween("2023-05-11", "2023-05-10", "2023-05-12")
Dates.daysDifference("2023-05-11", "2023-05-10")

// Maps examples:
Maps.isEmpty(new Map())
Maps.isMap([[0, "a"], [1, "b"]])
const map = new Map();
map.set("a", "abc")
map.set("b", false)
map.set("c", 123)
Maps.toObject(map)

// Numbers examples:
Numbers.abs(-1)
Numbers.isPrime(2)
Numbers.isNatural(-123)

// Objects examples:
Objects.omit({ a: !0 }, "a")
Objects.toJSON({ a: null, b: true, c: undefined })
Objects.isObject({})
Objects.isNotNull({})
Objects.pick({ a: null, b: true }, "a")
Objects.toIterable({ a: 'abc', b: 444, c: true })

// Sets examples:
Sets.isNotEmpty(new Set())
Sets.isSet(undefined)
const set = new Set()
set.add("abc")
Sets.toMap(set)

// Strings examples:
Strings.isNullOrEmpty("")
Strings.normalize("  Lorem  ipsum dolor sit ")
Strings.isSpaceChar("\t")
Strings.isNumeric("12.34")
Strings.hasWhitespace("Lorem\t")
Strings.countMatches("ho ho ho", "ho")
Strings.toTitleCase("jOhN doE")
Strings.toCharArray("🐑🐑🐑")
Strings.repeat("abc", 5)
Strings.remove("adefbc", "def")

// Utils examples:
Utils.isBoolean(false)
Utils.isFunction(() => {})
Utils.isIterable(new Set())
Utils.isNullOrUndefined(undefined)
Utils.isDefined(false)
Utils.isPrimitive("abc")
Utils.isUndefined(null)
```

## Support

Something isn't working as expected in this library? Feel free to create a GitHub issue.

## Contribution

Please contact me if you would like to contribute to utilitates.

## Roadmap

Latest stable: v1.3.1

## License

Licensed under [the MIT License](https://github.com/icapri/utilities/blob/main/LICENSE).