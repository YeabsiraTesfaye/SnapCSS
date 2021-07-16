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
    const trial = CSS.fromString('Trial CSS')
    // eslint-disable-next-line no-console
    //console.log(trial.toString())




    var l = new Loader('C:/Users/Yeabsira Tesfaye/Desktop/CSS_optimizer/indexCss.css');
    console.log(new restructurer().NonMediaTags(l.scan()));
    console.log(new restructurer().MediaTags(l.scan()));


  }
}

export = SnapCss
