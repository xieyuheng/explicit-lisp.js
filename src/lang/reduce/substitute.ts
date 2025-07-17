import * as Exps from "../exp/index.ts"
import {
  bindsExtend,
  bindsIsEmpty,
  bindsMapExp,
  bindsMerge,
  bindsTakeNames,
  type Binds,
  type Exp,
} from "../exp/index.ts"
import { globalFreshen } from "../utils/globalFreshen.ts"
import { lookup } from "./lookup.ts"

// NOTE `substitute` should not call `reduce.

export function substitute(binds: Binds, body: Exp): Exp {
  binds = bindsTakeNames(binds, Exps.expFreeNames(new Set(), body))

  if (bindsIsEmpty(binds)) {
    return body
  }

  switch (body["kind"]) {
    case "Var": {
      const found = lookup(body.name, binds)
      if (found) {
        return found
      } else {
        return body
      }
    }

    case "Lazy": {
      if (body.cache) {
        return substitute(binds, body.cache)
      } else {
        return Exps.Lazy(substitute(binds, body.exp))
      }
    }

    case "Lambda": {
      const freshName = globalFreshen(body.name)
      return Exps.Lambda(
        freshName,
        Exps.Let(bindsExtend(binds, body.name, Exps.Var(freshName)), body.ret),
      )
    }

    case "Apply": {
      return Exps.Apply(Exps.Let(binds, body.target), Exps.Let(binds, body.arg))
    }

    case "Let": {
      return substitute(composeBinds(binds, body.binds), body.body)
    }
  }
}

export function composeBinds(left: Binds, right: Binds): Binds {
  return bindsMerge(
    left,
    bindsMapExp(right, (exp) => substitute(left, exp)),
  )
}
