import fs from 'fs';
import path from 'path';

/**
 * Asserts a file path directory exists recursively, creating it if it does not.
 *
 * @param filePath - The full path to the file, that may or may not exist.
 */
export function ensureFilePathExists(filePath: string): void {
  const dirName = path.dirname(filePath);
  ensureDirectoryPathExists(dirName);
}

/**
 * Asserts a directory exist recursively, creating it if it does not.
 *
 * @param directoryPath - The full directory path, that may or may not exists.
 */
export function ensureDirectoryPathExists(directoryPath: string): void {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }
}

/**
 * Copies a folder recursively.
 *
 * @param sourceFolder - Source folder to be copied.
 * @param targetFolder - Target folder.
 */
export function copyFolderSync(sourceFolder: string, targetFolder: string): void {
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder);
  }
  fs.readdirSync(sourceFolder).forEach(element => {
    const sourceElement = path.join(sourceFolder, element);
    const targetElement = path.join(targetFolder, element);
    if (fs.lstatSync(sourceElement).isFile()) {
      fs.copyFileSync(sourceElement, targetElement);
    } else {
      copyFolderSync(sourceElement, targetElement);
    }
  });
}
