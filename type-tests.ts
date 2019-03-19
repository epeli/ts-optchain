import { assert, IsExact,Has, IsNullable} from "conditional-type-checks";

import { oc } from "./src";

interface X {
  a?: {
    b?: string;
    literal?: "literal";
    union?: "foo" | "bar";
    maybeNull: string | null
  }
}

declare const x: X;

const resWithDefault = oc(x).a.b("")
assert<IsExact<typeof resWithDefault, string>>(true);

const resMaybeNull = oc(x).a.maybeNull("")
assert<IsExact<typeof resMaybeNull, string>>(true);

const resUnion = oc(x).a.union("foo")
assert<Has<typeof resUnion, "foo">>(true)
assert<Has<typeof resUnion, "bar">>(true)

// Does not have null or undefined
assert<IsNullable<typeof resUnion>>(false)