import CSS from '../css/css'

export default interface Optimizer {
  optimize(input: CSS): CSS;
}
