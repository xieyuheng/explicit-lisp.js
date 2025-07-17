import { formatExp } from "../format/formatExp.ts"
import { modDefine, type Mod } from "../mod/index.ts"
import { reduce } from "../reduce/reduce.ts"
import { type Stmt } from "../stmt/Stmt.ts"
import { importOne } from "./importOne.ts"

export function execute(mod: Mod, stmt: Stmt): null {
  switch (stmt["@kind"]) {
    case "Compute": {
      const reducedExp = reduce(mod, stmt.exp)
      console.log(formatExp(reducedExp))
      return null
    }

    case "Define": {
      modDefine(mod, stmt.name, {
        mod,
        name: stmt.name,
        exp: stmt.exp,
      })
      return null
    }

    case "Import": {
      for (const entry of stmt.entries) {
        importOne(mod, stmt.path, entry)
      }

      return null
    }
  }
}
