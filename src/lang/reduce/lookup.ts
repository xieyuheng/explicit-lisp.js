import { type Exp } from "../exp/index.ts"
import { type Subst } from "../subst/index.ts"

export function lookup(name: string, subst: Subst): Exp | undefined {
  for (const binding of subst.values()) {
    if (binding.name === name) {
      return binding.exp
    }
  }

  return undefined
}
