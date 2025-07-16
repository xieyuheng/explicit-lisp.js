import { executeMod } from "./executeMod.ts"
import { load } from "./load.ts"

export async function run(url: URL): Promise<void> {
  const mod = await load(url, new Map())
  executeMod(mod)
}
