# is-empty-dir

A fast, reliable utility to check if a directory is empty or contains only files you want to ignore. Built with modern JavaScript and performance optimizations.

## Features
- **Fast**: Early exit optimization for large directories
- **Flexible**: Ignore files by name, RegExp, or custom function
- **Sync & Async**: Use in both callback and promise-based code
- **Cross-platform**: Works on Linux, macOS, and Windows
- **Supports CommonJS and ES Modules**

## Installation

```sh
npm install is-empty-dir
```

## Usage

### CommonJS
```js
const isEmptyDir = require('is-empty-dir');

(async () => {
  const empty = await isEmptyDir('/path/to/dir');
  console.log(empty); // true or false
})();

// Synchronous
const { isEmptyDirSync } = require('is-empty-dir');
const emptySync = isEmptyDirSync('/path/to/dir');
console.log(emptySync); // true or false
```

### ES Modules
```js
import isEmptyDir, { isEmptyDirSync } from 'is-empty-dir';

const empty = await isEmptyDir('/path/to/dir');
const emptySync = isEmptyDirSync('/path/to/dir');
```

## API

### `isEmptyDir(dirPath, options?)`
- `dirPath` (`string`): Path to the directory
- `options` (`object`, optional):
  - `ignore` (`Array<string|RegExp|Function>`): Patterns or functions to ignore files (default: `[]`)
  - `followSymlinks` (`boolean`): Whether to follow symbolic links (default: `false`)
- **Returns**: `Promise<boolean>`

### `isEmptyDirSync(dirPath, options?)`
- Same as above, but synchronous. Returns `boolean`.

#### Ignore Patterns
- **String**: Exact filename to ignore
- **RegExp**: Pattern to match filenames
- **Function**: `(filename) => boolean` custom logic

#### Example: Ignore dotfiles and `node_modules`
```js
const empty = await isEmptyDir('/dir', {
  ignore: [/^\./, 'node_modules']
});
```

## Error Handling
- Throws if the path does not exist or is not a directory
- Throws on permission errors

## License

MIT © 2025 opensly

## Contributing

If you find a bug or have a feature request, please [raise an issue](https://github.com/opensly/is-empty-dir/issues).

Want to contribute? Fork the repository and [create a pull request](https://github.com/opensly/is-empty-dir/pulls) with your proposed changes!
