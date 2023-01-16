declare module 'qiao-regedit' {
  export function delValueSync({
    key,
    name,
  }: {
    key: string;
    name: string;
  }): Promise<void>;
}
