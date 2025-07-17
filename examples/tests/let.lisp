(lambda (x) x)

(let ((id (lambda (x) x)))
  id)

(let ((id (lambda (x) x)))
  (id id))
