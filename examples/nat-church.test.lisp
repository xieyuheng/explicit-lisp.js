(import "nat-church.lisp" zero add1 add add-rosser)
(import "nat-church.lisp" one two three four five six seven eight nine ten)

(add two five) seven
(add three three) six

(add-rosser two five) seven
(add-rosser three three) six
