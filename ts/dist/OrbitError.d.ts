import { Context } from './Context';
declare class OrbitError extends Error {
    isOrbitError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { OrbitError };
