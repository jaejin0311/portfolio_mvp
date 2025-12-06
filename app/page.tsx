'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState } from 'react';

export default function Home() {
  // 나중에 스마트 컨트랙트랑 연결할 상태값들 (지금은 껍데기)
  const [message, setMessage] = useState('');

  return (
    <main className="min-h-screen bg-gray-950 text-white selection:bg-blue-500 selection:text-white">
      
      {/* 1. 네비게이션 바 (상단) */}
      <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-bold text-xl tracking-tighter">
            JAEJIN<span className="text-blue-500">.ETH</span>
          </div>
          {/* 지갑 연결 버튼 */}
          <ConnectButton showBalance={false} chainStatus="icon" />
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-20">
        
        {/* 2. 히어로 섹션 (자기소개) */}
        <section className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-6 border border-blue-500/20">
            Based in South Korea 🇰🇷
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
            Hybrid Web3<br /> Developer & PM
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            Hello, I'm <strong className="text-white">Jaejin Kim</strong>.<br />
            I bridge the gap between traditional web services and decentralized protocols.
            Currently serving in the ROK Army, building the future.
          </p>
        </section>

        {/* 3. 방명록 섹션 (UI 껍데기) */}
        <section className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <h2 className="text-xl font-bold">On-Chain Guestbook</h2>
          </div>

          {/* 글쓰기 입력창 */}
          <div className="flex gap-2 mb-8">
            <input 
              type="text" 
              placeholder="Leave a message on the blockchain..." 
              className="flex-1 bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              Sign
            </button>
          </div>

          {/* 방명록 리스트 (가짜 데이터) */}
          <div className="space-y-4">
            {/* 예시 1 */}
            <div className="border-b border-gray-800 pb-4 last:border-0">
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-mono text-gray-500">0x12...AB34</span>
                <span className="text-xs text-gray-600">Dec 6, 2025</span>
              </div>
              <p className="text-gray-300">화이팅입니다! 전역까지 힘내세요! 🔥</p>
            </div>
            
            {/* 예시 2 */}
            <div className="border-b border-gray-800 pb-4 last:border-0">
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-mono text-gray-500">vitalik.eth</span>
                <span className="text-xs text-gray-600">Dec 5, 2025</span>
              </div>
              <p className="text-gray-300">Interesting portfolio. Keep building!</p>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}