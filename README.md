# :rocket: utilitates

## Description

This library contains utilities for built-in JavaScript classes such as
`Array`, `Date`, `Map`, `Number`, `Object`, `Set` and `String`.

## Installation

Execute the following command from your project directory:
```bash
npm install utilitates
```
and then enjoy using it.

## Usage

This library is simply composed of abstract classes which can be used as follows:

```typescript
// yourFile.ts
import { Arrays } from 'utilitates'

// somewhere in your code..
const users = await getUsers();
if (Arrays.isNotEmpty(users)) {
  // do something..
}

const array = ['Cat', 'Dog', 'Rabbit'];
const last = Arrays.last(array); // "Rabbit"
```

```typescript
// yourOtherFile.ts
import { Dates } from 'utilitates'

// somewhere in your code..
const someDate = new Date('2023-04-27T22:00:00');
const otherDate = new Date('2023-04-27T22:00:00');
if (Dates.isAfter(someDate, otherDate)) {
  // do something..
}
```

```typescript
// anotherFile.ts
import { Strings } from 'utilitates'

const str = '  Lorem  ipsum dolor sit ';
const normalized = Strings.normalize(str);
console.log(normalized); // "Lorem ipsum dolor sit"
```

## Support

Something isn't working as expected in this library? Feel free to create an issue on GitHub and I will work on it.

## Contribution

Please contact me if you would like to contribute to utilitates.

## Roadmap

Latest stable: v1.2.4

## License

Licensed under [the MIT License](https://github.com/icapri/utilities/blob/main/LICENSE)