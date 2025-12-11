import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Turbopack 관련 설정을 유지하여 충돌 방지
  turbopack: {}, 
  compiler: {
    emotion: true, 
  },
  
  // 👇 Webpack 설정을 더 강력하게 변경합니다.
  webpack: (config, { isServer }) => {
    // 🚨 서버 빌드 시에만 적용
    if (isServer) {
      // WalletConnect 관련 모듈이 서버 번들에 포함되지 않도록 node_modules를 외부 종속성으로 처리
      config.externals = {
        ...config.externals,
        // Node.js 기본 모듈은 제외
        'encoding': 'commonjs encoding',
      };
      // pino와 관련된 추가적인 모듈들을 강제로 무시
      config.externals.push(
        'pino', 
        'lokijs', 
        'thread-stream/test/helper.js'
      );
      
      // Node Externals를 사용하여 서버 번들 크기를 줄이고 모듈 참조 오류를 회피 (Next.js 권장 방식)
      config.externals.unshift({
        '@walletconnect/universal-provider': 'commonjs @walletconnect/universal-provider',
        '@walletconnect/ethereum-provider': 'commonjs @walletconnect/ethereum-provider',
      });
    }

    return config;
  },
};

export default nextConfig;