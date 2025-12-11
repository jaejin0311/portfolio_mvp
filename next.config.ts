import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Turbopack 경고를 잠재우기 위한 빈 설정 (하지만 package.json의 --webpack이 우선합니다)
  turbopack: {},

  compiler: {
    emotion: true,
  },

  webpack: (config) => {
    // resolve.alias를 사용하여 문제 모듈들을 'false'로 설정 (아예 로드하지 않음)
    config.resolve.alias = {
      ...config.resolve.alias,
      'pino': false,
      'thread-stream': false,
      'pino-pretty': false,
      'encoding': false,
      'lokijs': false,
    };
    return config;
  },
};

export default nextConfig;