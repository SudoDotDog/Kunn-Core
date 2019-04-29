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

    public get lines(): Line[] {

        return [...this._head, ...this._body, ...this._tail];
    }

    public get length(): number {

        return this.lines.length;
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

    public combine(indent: string = ' ', count: number = 4): string {

        return [...this._head, ...this._body, ...this._tail]
            .map((line: Line) => (indent).repeat(count * line.nest) + line.text)
            .join('\n');
    }
}
