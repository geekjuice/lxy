const got = require('got');
const { load } = require('cheerio');
const { URL, TYPES } = require('./constants');

module.exports = async () => {
  const { body: home } = await got(URL);

  const $home = load(home);

  return Array.from(
    $home('table').map((_, table) => {
      const $table = $home(table);
      const type = $table.find('h2').text();

      if (!TYPES.test(type)) {
        return null;
      }

      const rows = Array.from(
        $table.find('tr > td.name > a').map((_, a) => {
          const $anchor = $home(a);
          return {
            name: $anchor.text().trim(),
            href: $anchor.attr('href'),
          };
        })
      );

      return { type, rows };
    })
  );
};
