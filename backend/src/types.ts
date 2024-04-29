import {Request} from 'express';
export type RequestWithQuery<T> = Request<{},{},{},T>;
export type RequestWithUri<T> = Request<T>;
export type RequestWithBody<T> = Request<{},{},T>;
export type RequestWithUriAndBody<T1, T2> = Request<T1,{},T2>;