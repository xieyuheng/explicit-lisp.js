inline `run`
rename `executeMod` to `run`
[run] `define` vs. `execute`
[run] move `importOne` to `define`

replace sexp with x-data

> 在 explicit-substitution 中实验，然后开始 cicada。

支持 `(assert-equal)` 与 `(assert-not-equal)`

- 用 `assert-equal` 验证基于 `Exp` 的 definitional 等价关系。

支持直接递归函数与相互递归函数，不能判断等价的地方就不判断。

- 验证基于 `Exp` 的递归函数之间的 definitional 等价关系。

验证基于 `Exp` 的 dependent type 类型检查器。

在实现 explicit-substitution 时避免全局的 `globalFreshen`。
