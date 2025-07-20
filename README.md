# Explicit Substitution

An implementation of lambda calculus by [explicit substitution](https://en.wikipedia.org/wiki/Explicit_substitution).

- The meaning of scheme's `(let)` can be viewed as explicit substitution.

```scheme
(define name body)
(define (name arg ...) body)
(import name ... "./file.scm")

(lambda (name) ret)
(let ((name exp) ...) body)
```

## Usages

### Command line tool

Install it by the following command:

```sh
npm install -g @xieyuheng/explicit-lisp.js
```

The command-line program is called `explicit-lisp.js`.

## Development

```sh
npm install
npm run build
npm run test
```

## License

[GPLv3](LICENSE)
