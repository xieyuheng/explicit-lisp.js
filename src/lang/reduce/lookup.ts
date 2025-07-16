import { type Exp } from "../exp/index.ts"
import { type Substitution } from "../substitution/index.ts"

export function lookup(
  name: string,
  substitution: Substitution,
): Exp | undefined {
  for (const binding of substitution.values()) {
    if (binding.name === name) {
      return binding.exp
    }
  }

  return undefined
}
