i32.eq(local.get(a), i32.const(0));
i32.eq(i32.const(0), local.get(a));

i64.eq(local.get(a), i64.const(0));
i64.eq(i64.const(0), local.get(a));

f32.eq(local.get(a), f32.const(0));
f32.eq(i32.const(0), local.get(a));

f64.eq(local.get(a), f64.const(0));
f64.eq(f64.const(0), local.get(a));
