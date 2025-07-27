import { formatExp } from "../format/index.ts"
import type { Mod } from "../mod/index.ts"
import { reduce } from "../reduce/index.ts"
import type { Stmt } from "../stmt/index.ts"

export async function handleEffect(mod: Mod, stmt: Stmt): Promise<void> {
  if (stmt.kind === "Compute") {
    const normalForm = reduce(mod, stmt.exp)
    console.log(formatExp(normalForm))
    return
  }
}
