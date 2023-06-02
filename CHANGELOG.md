* ## `v1.6.1` - 2023-06-02

### Added
* An abstract utility class `Blobs` with converters, validators, etc. related to `Blob` objects.
* A static getter `Utils.globalScope` for accessing `globalThis` or `window` or `global`.
* A static method `Numbers.pad()`.

### Removed
* The static method `Objects.getType()` as it exists as `Objects.toString()`.