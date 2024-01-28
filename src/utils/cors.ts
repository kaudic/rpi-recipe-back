import { Request } from 'express';
import { CorsOptions } from 'cors';

export const methods: string[] = [
  'GET',
  'POST',
  'PUT',
  'PATCH',
  'DELETE',
  'OPTIONS',
  'UPDATE',
  'HEAD',
];

export const developmentAllowlist: string[] = [
  'http://localhost:3000',
  'http://localhost:5000',
];

export const productionAllowlist: string[] = [
  'https://www.audic-server.com',
  'https://audic-server.com',
  'https://recipe.audic-server.com',
];

export function corsSetUp(request: Request, callback: any) {
  const isDevelopment = process.env.NODE_ENV === 'development';

  const corsOptions: CorsOptions = {
    methods,
    credentials: true,
    origin: isDevelopment
      ? developmentAllowlist.includes(request.headers['origin'])
      : productionAllowlist.includes(request.headers['origin']),
  };
  corsOptions.origin = true;
  callback(undefined, corsOptions);
}
