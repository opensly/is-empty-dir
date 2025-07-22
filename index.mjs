import { readdir, stat } from 'fs/promises';
import { readdirSync, statSync } from 'fs';

/**
 * Check if a directory is empty (async)
 * @param {string} dirPath - Path to directory to check
 * @param {Object} [options] - Options object
 * @param {Array<string|RegExp|Function>} [options.ignore] - Patterns to ignore
 * @param {boolean} [options.followSymlinks] - Whether to follow symbolic links
 * @returns {Promise<boolean>} - True if directory is empty or only contains ignored files
 */
async function isEmptyDir(dirPath, options = {}) {
  const { ignore = [], followSymlinks = false } = options;

  if (typeof dirPath !== "string") {
    throw new TypeError("Expected dirPath to be a string");
  }

  try {
    const stats = await stat(dirPath);

    if (!stats.isDirectory()) {
      throw new Error(`Path is not a directory: ${dirPath}`);
    }

    const files = await readdir(dirPath, { withFileTypes: true });

    // Early exit optimization - check each file immediately
    for (const file of files) {
      if (!followSymlinks && file.isSymbolicLink()) {
        continue;
      }

      if (!shouldIgnore(file.name, ignore)) {
        return false; // Found a file that shouldn't be ignored
      }
    }

    return true;
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error(`Directory does not exist: ${dirPath}`);
    }
    if (error.code === "EACCES") {
      throw new Error(`Permission denied: ${dirPath}`);
    }
    throw error;
  }
}

/**
 * Check if a directory is empty (sync)
 * @param {string} dirPath - Path to directory to check
 * @param {Object} [options] - Options object
 * @param {Array<string|RegExp|Function>} [options.ignore] - Patterns to ignore
 * @param {boolean} [options.followSymlinks] - Whether to follow symbolic links
 * @returns {boolean} - True if directory is empty or only contains ignored files
 */
function isEmptyDirSync(dirPath, options = {}) {
  const { ignore = [], followSymlinks = false } = options;

  if (typeof dirPath !== "string") {
    throw new TypeError("Expected dirPath to be a string");
  }

  try {
    const stats = statSync(dirPath);

    if (!stats.isDirectory()) {
      throw new Error(`Path is not a directory: ${dirPath}`);
    }

    const files = readdirSync(dirPath, { withFileTypes: true });

    // Early exit optimization - check each file immediately
    for (const file of files) {
      if (!followSymlinks && file.isSymbolicLink()) {
        continue;
      }

      if (!shouldIgnore(file.name, ignore)) {
        return false; // Found a file that shouldn't be ignored
      }
    }

    return true;
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error(`Directory does not exist: ${dirPath}`);
    }
    if (error.code === "EACCES") {
      throw new Error(`Permission denied: ${dirPath}`);
    }
    throw error;
  }
}

/**
 * Helper function to determine if a file should be ignored
 * @param {string} filename - Name of the file
 * @param {Array<string|RegExp|Function>} ignorePatterns - Patterns to check against
 * @returns {boolean} - True if file should be ignored
 */
function shouldIgnore(filename, ignorePatterns) {
  if (!Array.isArray(ignorePatterns)) {
    return false;
  }

  return ignorePatterns.some((pattern) => {
    if (typeof pattern === "string") {
      return filename === pattern;
    }
    if (pattern instanceof RegExp) {
      return pattern.test(filename);
    }
    if (typeof pattern === "function") {
      return pattern(filename);
    }
    return false;
  });
}

// ES modules exports (will be handled by build script)

// ES modules exports
export default isEmptyDir;
export { isEmptyDir, isEmptyDirSync };
