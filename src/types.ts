import { Request } from 'express'; 
 
export type TypedParamsRequest<T> = Request<T>;
export type TypedBodyRequest<T> = Request<{}, {}, T>;
export type TypedParamsBodyRequest<T, K> = Request<T, {}, K>;
export type TypedQueryRequest<T> = Request<{}, {}, {}, T>;

 
 