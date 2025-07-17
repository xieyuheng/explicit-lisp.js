import * as Exps from "../exp/index.ts"
import { bindsInitial, type Exp } from "../exp/index.ts"
import { modFind, type Mod } from "../mod/index.ts"
import { substitute } from "./substitute.ts"

// NOTE `reduce` might hit fixpoint on other kind of expressions,
// but it will always remove `Let`.

export function reduce(mod: Mod, exp: Exp): Exp {
  switch (exp["kind"]) {
    case "Var": {
      const defintion = modFind(mod, exp.name)
      if (defintion) {
        return reduce(mod, defintion.exp)
      } else {
        return exp
      }
    }

    case "Lazy": {
      if (exp.cache) {
        return exp.cache
      } else {
        exp.cache = reduce(mod, exp.exp)
        return exp.cache
      }
    }

    case "Lambda": {
      return Exps.Lambda(exp.name, reduce(mod, exp.ret))
    }

    case "Apply": {
      const target = reduce(mod, exp.target)
      const arg = Exps.Lazy(exp.arg)

      switch (target["kind"]) {
        case "Lambda": {
          const binds = bindsInitial(target.name, arg)
          return reduce(mod, substitute(binds, target.ret))
        }

        default: {
          return Exps.Apply(target, reduce(mod, arg))
        }
      }
    }

    case "Let": {
      return reduce(mod, substitute(exp.binds, exp.body))
    }
  }
}
