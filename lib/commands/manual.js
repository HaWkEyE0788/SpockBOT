var Clapp = require('../modules/clapp-discord');
const cfg = require('../../config.js');

const manual = [
  'Welcome to the manual\nFirstly to get help at any point, use the --help command',
  '--help',
  'You can get crew stats with the stats command. You only need a partial match on the name',
  'stats rakal',
  'If there are more than one matches, the bot will give suggestions',
  'stats worf',
  'And you can then be more specific',
  'stats mir worf',
  'There are flags you can pass to see more specific stats',
  'stats mir worf -s 1',
  'For more help on a specific command like this, you can use --help on individual commands',
  'stats --help',
  'For more extended stats, there is the estats command',
  'estats rakal',
  'And to find crew of interest you can use the search command',
  'search borg',
  'You can search not only by trait but also by character class',
  'search crafty',
  'Or multiple criteria at a time',
  'search crafty human',
  'The best command will show the best crew under various critiria',
  'best base cmd',
  'with flags to restrict your search. For example 1/5 chars',
  'best base cmd -f1',
  'or 3/3 chars',
  'best base sci -s3',
  'or gauntlet characters',
  'best gauntlet med',
  'including multiple skills',
  'best gauntlet med sci',
  'Or drop rates for individual items',
  'farm 1 database',
  'And have results adjusted for supply kits',
  'farm 1 database -k'
];

module.exports = new Clapp.Command({
  name: "manual",
  desc: "show manual",

  fn:(argv, context) => new Promise((fulfill, reject) => {
    const channelName = context.channel.name;
    const author = context.author.username;
    const guild = context.channel.guild;
    const guildOwner = guild ? guild.ownerID : NaN;

    if (context.author.id === guildOwner) {
      let i=0;

      let doNext = function() {
        context.channel.send(`__${manual[i]}__`).then(x => {
          context.channel.send(cfg.prefix + ' '+manual[i+1]).then(y => {
            i+=2;
            if (manual[i]) {
              setTimeout(doNext, 100);
            }
            else {
              fulfill('Server manual done!');
            }
          });
        });

      };

      doNext();

    }
    else {
      fulfill('Only the server administrator can run this');
    }

  }),
  args: [

  ]
});

