declare module "pdf-parse-debugging-disabled" {
  function parse(data: Buffer | Uint8Array): Promise<any>;
  export = parse;
}
