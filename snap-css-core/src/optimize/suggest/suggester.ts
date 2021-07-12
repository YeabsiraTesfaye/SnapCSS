import Optimizer from '../optimizer'
import CSS from '../../css/css'

export default class Suggester implements Optimizer {
  optimize(input: CSS): CSS {
    return input
  }
}
