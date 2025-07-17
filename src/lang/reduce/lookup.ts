import { type Binds, type Exp } from "../exp/index.ts"

export function lookup(name: string, binds: Binds): Exp | undefined {
  for (const bind of binds.values()) {
    if (bind.name === name) {
      return bind.exp
    }
  }

  return undefined
}
