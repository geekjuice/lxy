const { magenta, blue } = require('chalk');
const debug = require('debug');
const meow = require('meow');
const { red } = require('chalk');
const main = require('./main');

(async () => {
  try {
    debug('lxy:main')('starting');

    const {
      input: [thing],
      flags: { things, help, version },
      showHelp,
      showVersion,
    } = meow(
      `
    usage: ${magenta('lxy')} ${blue('[thing]')}

    options:
      ${blue('-t, --things')}   list things to learn
      ${blue('-h, --help')}     show help
      ${blue('-v, --version')}  show version
    `,
      {
        autoHelp: false,
        autoVersion: false,
        flags: {
          things: {
            alias: 't',
          },
          help: {
            alias: 'h',
          },
          version: {
            alias: 'v',
          },
        },
      }
    );

    if (help) {
      showHelp();
    }

    if (version) {
      showVersion();
    }

    await main(thing, { things });

    debug('lxy:main')('exiting');
    process.exit(0);
  } catch (err) {
    debug('lxy:error')(err);
    console.log(red('\n(╯°□°)╯︵ ┻━┻'));
    process.exit(1);
  }
})();
