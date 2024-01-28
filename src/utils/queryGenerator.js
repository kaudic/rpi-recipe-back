/**
 * Transform camelCase string : all upperCase of a string in '_' + 'lowercase'
 * @param {string} string - The string in camelCase
 * @returns {string} - Array containing a string of column names, string of placeholders and array of values
 */

const replaceCamelCase = (str) => {
  return str
    .split(/\.?(?=[A-Z])/)
    .join('_')
    .toLowerCase();
};

/**
 * Analyse an object to return keys, placeholders and values of each key
 * @param {object} object - The object to analyse
 * @returns {array<string,string,array>} - Array containing a string of column names, string of placeholders and array of values
 */

const insertQueryGenerator = (object) => {
  // Generate a string of columns and replace camelCase with underscore
  // Generate a string for placeHolders
  let columns = '(';
  let placeHolders = '(';
  let i = 1;
  const values = [];

  for (const key in object) {
    columns += replaceCamelCase(key) + ',';
    placeHolders += '$' + i + ',';
    i++;
    values.push(object[key]);
  }

  // return an array with columns, placeholders and values
  return [columns.slice(0, -1) + ')', placeHolders.slice(0, -1) + ')', values];
};

/**
 * Analyse an object to return a setStatement, and values on the side
 * @param {object} object - The object to analyse
 * @returns {array<string,string,array>} - Array containing a string of column names, string of placeholders and array of values
 */

const updateQueryGenerator = (object, options = { countStarter: 2 }) => {
  const { countStarter } = options;

  let setStatement = 'SET ';
  let i = parseInt(countStarter); // we keep $1 placeHolder for the id of the row to modify by default
  const values = [];

  for (const key in object) {
    setStatement += replaceCamelCase(key) + '=' + '$' + i + ',';
    i++;
    values.push(object[key]);
  }

  return [setStatement.slice(0, -1), values];
};

module.exports = { insertQueryGenerator, updateQueryGenerator };
