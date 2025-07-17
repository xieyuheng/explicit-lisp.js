import { type Mod } from "../mod/index.ts"
import { define } from "./define.ts"
import { execute } from "./execute.ts"

export function run(mod: Mod): void {
  if (mod.isExecuted) return

  for (const stmt of mod.stmts) define(mod, stmt)
  for (const stmt of mod.stmts) execute(mod, stmt)

  mod.isExecuted = true
}
