import {Command, flags} from '@oclif/command'
// import CSS from './css/css'
import Restructurer from './optimize/restructure/restructurer'
import Loader from './load/loader'
// import Cleaner from './optimize/clean/cleaner'
// import Compressor from './optimize/compress/compressor'
const css = require('../node_modules/css')
// const fs = require('fs')

class SnapCss extends Command {
  static description = 'describe the command here'

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  }

  static args = [{name: 'file'}]

  async run() {
    // const {args, flags} = this.parse(SnapCss)

    // const name = flags.name ?? 'world'
    // this.log(`hello ${name} from ./src/index.ts`)
    // if (args.file && flags.force) {
    //   this.log(`you input --force and --file: ${args.file}`)
    // }
    // const trial = CSS.fromString('Trial CSS')
    // eslint-disable-next-line no-console
    // console.log(trial.toString())

    const l = new Loader('C:\\cnap-css-vue\\snap-css\\testcss.css').scan()
    const r = new Restructurer()
    // const c = new Cleaner()

    // console.log(c.NonMediaTags(css.stringify(l)))
    // var result = Object.assign(r.NonMediaTags(l), r.MediaTags(l));
    const res = r.optimize(l)
    // const nmt = css.stringify(res[0]);
    // const mt = css.stringify(res[1]);
    // eslint-disable-next-line no-console
    console.log(css.stringify(res))

    // var b = c.NonMediaTags(l);

    // var a = c.MediaTags(l);

    // var c = new Compressor();
    // const comp = 'body{padding-top:1px; padding-right:2px; padding-bottom:1px; padding-left:2px}'

    // var compressed = c.findLonghand(css.stringify(l[0]) + '\n\n' + css.stringify(l[1]))

    function writeToFile(data: any) {
      const fs = require('fs')

      fs.writeFile('css.css', data, (err: any) => {
        if (err) throw err
      })
    }
    writeToFile(css.stringify(res))

    // c.compress(l[0]);
  }
}

export = SnapCss
