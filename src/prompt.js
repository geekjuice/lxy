const prompts = require('prompts');

module.exports = async normalized =>
  prompts({
    type: 'autocomplete',
    name: 'href',
    message: 'what do you want to learn?',
    choices: Object.entries(normalized).reduce(
      (choices, [title, value]) => [...choices, { title, value }],
      []
    ),
  });
