import { type Substitution } from "../substitution/index.ts"

export type Exp = Var | Lazy | Fn | Ap | Let
export type Var = { kind: "Var"; name: string }
export type Lazy = { kind: "Lazy"; exp: Exp; cache?: Exp }
export type Fn = { kind: "Fn"; name: string; ret: Exp }
export type Ap = { kind: "Ap"; target: Exp; arg: Exp }
export type Let = { kind: "Let"; substitution: Substitution; body: Exp }

export function Var(name: string): Var {
  return {
    kind: "Var",
    name,
  }
}

export function Lazy(exp: Exp, cache?: Exp): Lazy {
  return {
    kind: "Lazy",
    exp,
    cache,
  }
}

export function Fn(name: string, ret: Exp): Fn {
  return {
    kind: "Fn",
    name,
    ret,
  }
}

export function Ap(target: Exp, arg: Exp): Ap {
  return {
    kind: "Ap",
    target,
    arg,
  }
}

export function Let(substitution: Substitution, body: Exp): Let {
  return {
    kind: "Let",
    substitution,
    body,
  }
}
