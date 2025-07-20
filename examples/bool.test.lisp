(import true false if and or not "bool.lisp")

(and true false) false
(or true false) true
(not true) false
(not (not true)) true

(lambda (x) (not (not true)))
(lambda (x) true)
