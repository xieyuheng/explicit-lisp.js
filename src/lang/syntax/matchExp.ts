import { cons, match, matchList, v, type Sexp } from "../../sexp/index.ts"
import * as Exps from "../exp/index.ts"
import { type Exp } from "../exp/index.ts"
import {
  substitutionFromBindings,
  type Binding,
} from "../substitution/index.ts"
import { matchName } from "./matchName.ts"

export function matchExp(sexp: Sexp): Exp {
  return match<Exp>(sexp, [
    [
      ["lambda", v("names"), v("exp")],
      ({ names, exp }) =>
        matchList(names, matchName).reduceRight(
          (fn, name) => Exps.Fn(name, fn),
          matchExp(exp),
        ),
    ],

    [
      ["let", v("bindings"), v("body")],
      ({ bindings, body }) =>
        Exps.Let(
          substitutionFromBindings(matchList(bindings, matchBinding)),
          matchExp(body),
        ),
    ],

    [
      cons(v("target"), v("args")),
      ({ target, args }) =>
        matchList(args, matchExp).reduce(
          (result, arg) => Exps.Ap(result, arg),
          matchExp(target),
        ),
    ],

    [v("name"), ({ name }, { span }) => Exps.Var(matchName(name))],
  ])
}

export function matchBinding(sexp: Sexp): Binding {
  return match<Binding>(sexp, [
    [
      [v("name"), v("exp")],
      ({ name, exp }) => ({
        name: matchName(name),
        exp: matchExp(exp),
      }),
    ],
  ])
}
