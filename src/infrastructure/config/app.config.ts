import { registerAs } from '@nestjs/config';

export default registerAs('app', (): {
  port: number;
  apiPrefix: string;
  fintualApi: {
    baseUrl: string;
    apiToken: string;
  };
} => ({
  port: parseInt(process.env.PORT || '3000', 10),
  apiPrefix: process.env.API_PREFIX || 'api',
  fintualApi: {
    baseUrl: process.env.FINTUAL_API_URL ?? 'https://api.fintual.com/api/v1',
    apiToken: process.env.FINTUAL_API_TOKEN || '',
  },
}));
