/**
 * @author WMXPY
 * @namespace Gesture
 * @description Buffer
 */

import { Line } from "./declare";

export class GestureBuffer {

    public static create(): GestureBuffer {

        return new GestureBuffer();
    }

    private readonly _head: Line[];
    private readonly _body: Line[];
    private readonly _tail: Line[];

    private constructor() {

        this._head = [];
        this._body = [];
        this._tail = [];
    }

    public appendHead(...lines: Line[]): this {

        this._head.push(...lines);
        return this;
    }

    public appendBody(...lines: Line[]): this {

        this._body.push(...lines);
        return this;
    }

    public appendTail(...lines: Line[]): this {

        this._tail.push(...lines);
        return this;
    }

    public combine(): string {

        return [...this._head, this._body, this._tail]
            .map((line: Line) => (' ').repeat(4 * line.nest) + line.text)
            .join('\n');
    }
}
