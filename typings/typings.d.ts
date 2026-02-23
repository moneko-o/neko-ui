declare module 'neko-ui' {
  export * from 'components';
}
declare module 'react';
declare module '*.wasm';
declare module 'http*';
declare const SolidJS: unknown;
declare module 'prismjs' {
  export type TokenStream = string | Token | Array<string | Token>;

  export class Token {
    /**
     * Creates a new token.
     *
     * @param type See {@link Prism.Token#type type}
     * @param content See {@link Prism.Token#content content}
     * @param [alias] The alias(es) of the token.
     * @param [matchedStr=""] A copy of the full string this token was created from.
     * @param [greedy=false] See {@link Prism.Token#greedy greedy}
     */
    constructor(
      type: string,
      content: TokenStream,
      alias?: string | string[],
      matchedStr?: string,
      greedy?: boolean,
    );

    /**
     * The type of the token.
     *
     * This is usually the key of a pattern in a {@link Grammar}.
     */
    type: string;

    /**
     * The strings or tokens contained by this token.
     *
     * This will be a token stream if the pattern matched also defined an `inside` grammar.
     */
    content: TokenStream;

    /**
     * The alias(es) of the token.
     *
     * @see TokenObject
     */
    alias: string | string[];

    /**
     * The length of the matched string or 0.
     */
    length: number;

    /**
     * Whether the pattern that created this token is greedy or not.
     *
     * @see TokenObject
     */
    greedy: boolean;

    /**
     * Converts the given token or token stream to an HTML representation.
     *
     * The following hooks will be run:
     * 1. `wrap`: On each {@link Prism.Token}.
     *
     * @param token The token or token stream to be converted.
     * @param language The name of current language.
     * @param [parent] The parent token stream, if any.
     * @return The HTML representation of the token or token stream.
     */
    static stringify(token: TokenStream, language: string, parent?: Array<string | Token>): string;
  }
}
