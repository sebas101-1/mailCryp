declare module 'emailjs-mime-parser' {
  class MimeParser {
    write(data: string | Uint8Array): void;
    end(): void;
    onheader: (node: any) => void;
    onbody: (node: any, content: any) => void;
  }

  export { MimeParser };
}
