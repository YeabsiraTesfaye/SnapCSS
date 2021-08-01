import { Command, flags } from '@oclif/command'
import CSS from './css/css'
import restructurer from './optimize/restructure/restructurer'
import Loader from './load/loader'
var fs = require('fs');
const prompt = require('prompt-sync')();

class SnapCss extends Command {
  static description = 'describe the command here'

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({ char: 'n', description: 'name to print' }),
    // flag with no value (-f, --force)
    force: flags.boolean({ char: 'f' }),
  }

  static args = [{ name: 'file' }]

  async run() {
    // const {args, flags} = this.parse(SnapCss)

    // const name = flags.name ?? 'world'
    // this.log(`hello ${name} from ./src/index.ts`)
    // if (args.file && flags.force) {
    //   this.log(`you input --force and --file: ${args.file}`)
    // }
    //const trial = CSS.fromString('Trial CSS')
    // eslint-disable-next-line no-console
    //console.log(trial.toString())




    var l = new Loader('C:\\Users\\Yeabsira Tesfaye\\Desktop\\snap-css-webpage\\node_modules\\sweetalert2\\dist\\sweetalert2.min.css').scan();
    var r = new restructurer();

    // console.log(r.NonMediaTags(l))
    //var result = Object.assign(r.NonMediaTags(l), r.MediaTags(l));
    const nmt = r.NonMediaTags(l);
    const mt = r.MediaTags(l);

    let toBEWritten = '';
    for (var n in nmt) {
      var tempProp = '';
      for (var ree in nmt[n]) {
        tempProp = tempProp + '   ' + ree + ' : ' + nmt[n][ree] + ';\n';

      }
      toBEWritten = toBEWritten + n + ' {\n' + tempProp + '}\n\n';
    }

    for (var m in mt) {
      var completeMt = '';
      for (var n in mt[m]) {
        var tempProp = '';
        for (var ree in mt[m][n]) {
          tempProp = tempProp + '      ' + ree + ' : ' + mt[m][n][ree] + ';\n';

        }
        completeMt = completeMt + '   ' + n + ' {\n' + tempProp + '   }\n\n';
      }

      toBEWritten = toBEWritten + m + ' {\n' + completeMt + '}\n\n';
    }
    // console.log(toBEWritten)

    r.WriteToFile(toBEWritten)





  }
}

export = SnapCss
