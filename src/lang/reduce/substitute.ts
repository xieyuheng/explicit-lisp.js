import * as Exps from "../exp/index.ts"
import { type Exp } from "../exp/index.ts"
import {
  substExtend,
  substIsEmpty,
  substMapExp,
  substMerge,
  substTakeNames,
  type Subst,
} from "../subst/index.ts"
import { globalFreshen } from "../utils/globalFreshen.ts"
import { lookup } from "./lookup.ts"

// NOTE `substitute` should not call `reduce.

export function substitute(subst: Subst, body: Exp): Exp {
  subst = substTakeNames(subst, Exps.expFreeNames(new Set(), body))

  if (substIsEmpty(subst)) {
    return body
  }

  switch (body["kind"]) {
    case "Var": {
      const found = lookup(body.name, subst)
      if (found) {
        return found
      } else {
        return body
      }
    }

    case "Lazy": {
      if (body.cache) {
        return substitute(subst, body.cache)
      } else {
        return Exps.Lazy(substitute(subst, body.exp))
      }
    }

    case "Fn": {
      const freshName = globalFreshen(body.name)
      return Exps.Fn(
        freshName,
        Exps.Let(substExtend(subst, body.name, Exps.Var(freshName)), body.ret),
      )
    }

    case "Ap": {
      return Exps.Ap(Exps.Let(subst, body.target), Exps.Let(subst, body.arg))
    }

    case "Let": {
      return substitute(composeSubst(subst, body.subst), body.body)
    }
  }
}

export function composeSubst(left: Subst, right: Subst): Subst {
  return substMerge(
    left,
    substMapExp(right, (exp) => substitute(left, exp)),
  )
}
