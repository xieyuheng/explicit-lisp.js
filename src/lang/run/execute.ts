import { formatExp } from "../format/formatExp.ts"
import { type Mod } from "../mod/index.ts"
import { reduce } from "../reduce/reduce.ts"
import { type Stmt } from "../stmt/Stmt.ts"

export function execute(mod: Mod, stmt: Stmt): null {
  switch (stmt["kind"]) {
    case "Compute": {
      const reducedExp = reduce(mod, stmt.exp)
      console.log(formatExp(reducedExp))
      return null
    }

    default: {
      return null
    }
  }
}
