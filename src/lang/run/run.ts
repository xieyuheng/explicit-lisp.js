import type { Mod } from "../mod/index.ts"
import { execute } from "./execute.ts"

export function executeMod(mod: Mod): boolean {
  if (mod.isExecuted) {
    return false
  }

  for (const stmt of mod.stmts) {
    const output = execute(mod, stmt)
    if (output) {
      console.log(output)
    }
  }

  mod.isExecuted = true
  return true
}
