// next.config.ts (이전 단계에서 수정한 코드 유지)
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Turbopack 경고 무시 및 Webpack 설정을 유지하기 위한 설정
  turbopack: {}, 
  
  // RainbowKit CSS 안정화를 위한 compiler 설정
  compiler: {
    emotion: true, 
  },
  
  // WalletConnect/pino 오류 해결을 위한 webpack 설정 유지
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push(
        'pino', 
        'lokijs', 
        'encoding',
        'thread-stream/test/helper.js'
      );
    }
    return config;
  },
};

export default nextConfig;