import { type Exp } from "../exp/index.ts"
import { type Mod } from "../mod/index.ts"

export type Definition = {
  mod: Mod
  name: string
  exp: Exp
}
