const learn = require('./learn');
const listing = require('./listing');
const normalize = require('./normalize');
const prompt = require('./prompt');

module.exports = async (thing, { things }) => {
  const data = await listing();
  const normalized = normalize(data);

  if (things) {
    console.log(Object.keys(normalized).join('\n'));
    process.exit(0);
  }

  const { href } = {}.hasOwnProperty.call(normalized, thing)
    ? { href: normalized[thing] }
    : await prompt(normalized);

  if (href == null) {
    process.exit(1);
  }

  const output = await learn(href);

  console.log(output);
};
