type TypeGuard<T> = (val: unknown) => T;

const string: TypeGuard<string> = (val: unknown) => {
  if (typeof val !== "string") throw new Error();
  return val;
};

const number: TypeGuard<number> = (val: unknown) => {
  if (typeof val !== "number") throw new Error();
  return val;
};

const array =
  <T>(inner: TypeGuard<T>) =>
  (val: unknown): T[] => {
    if (!Array.isArray(val)) throw new Error();
    return val.map(inner);
  };

const object = <T extends Record<string, TypeGuard<any>>>(inner: T) => {
  return (val: unknown): { [P in keyof T]: ReturnType<T[P]> } => {
    if (val === null || typeof val !== "object") throw new Error();

    const out: { [P in keyof T]: ReturnType<T[P]> } = {} as any;

    for (const k in inner) {
      out[k] = inner[k]((val as any)[k]);
    }

    return out;
  };
};

const apiPost = object({
  slug: string,
  title: string,
  date: string,
  thumbnail: string,
  author: object({
    name: string,
    avatar: string,
  }),
});

export const apiPosts = (posts: any[]) => posts.map((post) => apiPost(post));

export type ApiPost = ReturnType<typeof apiPost>;
