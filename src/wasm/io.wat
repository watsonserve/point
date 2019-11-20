(module
  (import "fetch" (func $fetch (param i64)))
  (func $io (param $rcx i64) (param $rdx i64) (result i64)
    get_local $rcx
    call $fetch
  )
  (export "io" (func $io))
)
