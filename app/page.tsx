'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState, useEffect } from 'react';
import { useReadContract, useWriteContract, useAccount } from 'wagmi';
import { GuestbookABI } from './abi';
import { GUESTBOOK_ADDRESS } from './contractAddress';

export default function Home() {
  const [message, setMessage] = useState('');
  const { isConnected } = useAccount();

  // 1. 블록체인에서 글 목록 읽어오기 (Read)
  const { data: messages, refetch } = useReadContract({
    address: GUESTBOOK_ADDRESS,
    abi: GuestbookABI,
    functionName: 'getMessages',
  });

  // 2. 블록체인에 글 쓰기 (Write)
  const { writeContract, isPending } = useWriteContract();

  const handleWrite = () => {
    if (!message) return;
    writeContract({
      address: GUESTBOOK_ADDRESS,
      abi: GuestbookABI,
      functionName: 'write',
      args: [message],
    }, {
      onSuccess: () => {
        alert("Transaction Sent! 블록체인에 기록 중입니다...");
        setMessage('');
        setTimeout(() => refetch(), 5000); // 5초 뒤에 목록 새로고침
      },
      onError: (error) => {
        alert("Error: " + error.message);
      }
    });
  };

  // 타임스탬프 변환 함수
  const formatDate = (timestamp: bigint) => {
    return new Date(Number(timestamp) * 1000).toLocaleString();
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white selection:bg-blue-500 selection:text-white">
      
      {/* 네비게이션 */}
      <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-bold text-xl tracking-tighter">
            JAEJIN<span className="text-blue-500">.ETH</span>
          </div>
          <ConnectButton showBalance={false} chainStatus="icon" />
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-20">
        
        {/* 히어로 섹션 */}
        <section className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-6 border border-blue-500/20">
            Based in South Korea 🇰🇷
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
            Hybrid Web3<br /> Developer & PM
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            Hello, I'm <strong className="text-white">Jaejin Kim</strong>.<br />
            Currently serving in the ROK Army, building the future on-chain.
          </p>
        </section>

        {/* 방명록 섹션 (Real Web3) */}
        <section className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <h2 className="text-xl font-bold">On-Chain Guestbook</h2>
            <span className="text-xs text-gray-500 ml-auto">
              {messages ? messages.length : 0} Messages
            </span>
          </div>

          {/* 입력창 */}
          <div className="flex gap-2 mb-8">
            <input 
              type="text" 
              placeholder={isConnected ? "Leave a message..." : "Connect wallet to write"} 
              className="flex-1 bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors disabled:opacity-50"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={!isConnected || isPending}
            />
            <button 
              onClick={handleWrite}
              disabled={!isConnected || isPending || !message}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isPending ? "Signing..." : "Sign"}
            </button>
          </div>

          {/* 글 목록 (실제 데이터) */}
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700">
            {!messages || messages.length === 0 ? (
              <p className="text-center text-gray-500 py-10">No messages yet. Be the first!</p>
            ) : (
              // 최신순 정렬 (배열 뒤집기)
              [...messages].reverse().map((msg, idx) => (
                <div key={idx} className="border-b border-gray-800 pb-4 last:border-0 hover:bg-gray-800/50 p-3 rounded-lg transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-mono text-blue-400">
                      {msg.sender.slice(0, 6)}...{msg.sender.slice(-4)}
                    </span>
                    <span className="text-xs text-gray-600">
                      {formatDate(msg.timestamp)}
                    </span>
                  </div>
                  <p className="text-gray-300 break-words">{msg.content}</p>
                </div>
              ))
            )}
          </div>
        </section>

      </div>
    </main>
  );
}