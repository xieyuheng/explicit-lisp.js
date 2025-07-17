import { type Exp } from "../exp/index.ts"
import { type Subst } from "../subst/index.ts"

export function lookup(name: string, subst: Subst): Exp | undefined {
  for (const bind of subst.values()) {
    if (bind.name === name) {
      return bind.exp
    }
  }

  return undefined
}
