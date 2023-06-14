## `v1.6.1` - 2023-06-02

### Added
* An abstract utility class `Blobs` with converters, validators, etc. related to `Blob` objects.
* A static getter `Utils.globalScope` for accessing `globalThis` or `window` or `global`.
* A static method `Numbers.pad()`.

### Removed
* The static method `Objects.getType()` as it exists as `Objects.toString()`.

## `v1.6.2` - 2023-06-08
### Added
* Method overloadings for all the `Dates` methods where for arguments an union type like
`Date | number | string` is used.
* Improved inline documentation for all the `Dates` utility methods.

## `v1.6.3` - 2023-06-13
### Removed
* `Strings` methods which exist in `String` (no reinvention of the wheel).

## `v1.6.4` - 2023-06-13
### Changed
* The `Arrays.sort()` method has been extended to support a sorting order as a second argument.

## `v1.6.5` - 2023-06-15
### Added
* `Arrays.containsNone()`, `Arrays.isSorted()`, `Arrays.removeAll()`, `Arrays.shuffle()`, `Arrays.subarray()`.