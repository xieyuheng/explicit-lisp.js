import { ParsingError, matchSymbol, type Sexp } from "../../sexp/index.ts"
import { numberSubscripts } from "../../utils/stringToSubscript.ts"

export function matchName(sexp: Sexp): string {
  const nameString = matchSymbol(sexp)
  const subscripts = Object.values(numberSubscripts)
  if (subscripts.some((subscript) => nameString.includes(subscript))) {
    throw new ParsingError(
      `[matchExp] A name should not include subscripts: ${nameString}`,
      sexp.span,
    )
  }

  return nameString
}
