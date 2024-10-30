export namespace Utils {
  export type P<Func extends (...args: any) => unknown> = Parameters<Func>[0];
  export type R<Func extends (...args: any) => unknown> = ReturnType<Func>;
}
