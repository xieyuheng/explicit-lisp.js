import { type Exp } from "../exp/index.ts"
import { type Mod } from "../mod/index.ts"

export type Def = {
  mod: Mod
  name: string
  exp: Exp
}
