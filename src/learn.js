const got = require('got');
const { load } = require('cheerio');
const { URL } = require('./constants');

module.exports = async href => {
  const { body: page } = await got(`${URL}${href}`);
  const link = load(page)('.filelink > a').attr('href');
  const { body } = await got(`${URL}/${link}`);
  return body;
};
