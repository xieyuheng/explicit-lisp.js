import { type Subst } from "../subst/index.ts"

export type Exp = Var | Lazy | Lambda | Apply | Let
export type Var = { kind: "Var"; name: string }
export type Lazy = { kind: "Lazy"; exp: Exp; cache?: Exp }
export type Lambda = { kind: "Lambda"; name: string; ret: Exp }
export type Apply = { kind: "Apply"; target: Exp; arg: Exp }
export type Let = { kind: "Let"; subst: Subst; body: Exp }

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

export function Lambda(name: string, ret: Exp): Lambda {
  return {
    kind: "Lambda",
    name,
    ret,
  }
}

export function Apply(target: Exp, arg: Exp): Apply {
  return {
    kind: "Apply",
    target,
    arg,
  }
}

export function Let(subst: Subst, body: Exp): Let {
  return {
    kind: "Let",
    subst,
    body,
  }
}
