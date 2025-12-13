'use client';

import { mainnet, sepolia } from 'wagmi/chains';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState, useEffect } from 'react';
import { useReadContract, useWriteContract, useAccount } from 'wagmi';
import { GuestbookABI } from './abi';
import { GUESTBOOK_ADDRESS } from './contractAddress';

// icons
import { FaCode, FaLaptopCode, FaTools, FaGithub, FaLink } from 'react-icons/fa';
import { SiSolidity, SiTypescript, SiNextdotjs, SiTailwindcss, SiPostgresql, SiMongodb } from 'react-icons/si';
import { TbGitBranch } from 'react-icons/tb';

export default function Home() {
  const [message, setMessage] = useState('');
  const { isConnected } = useAccount();
  const [openProjectId, setOpenProjectId] = useState<string | null>(null);

  // 1. 블록체인에서 글 목록 읽어오기 (Read)
  const { data: messages, refetch } = useReadContract({
    address: GUESTBOOK_ADDRESS,
    abi: GuestbookABI,
    functionName: 'getMessages',
    chainId: sepolia.id,
  });

  useEffect(() => {
    // isConnected에 의존하지 않고, 최초 렌더링 시 데이터를 가져옵니다.
    refetch();
  }, [refetch]);

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

      <div className="max-w-4xl mx-auto px-6 py-20">
        
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

        <section id="portfolio" className="bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8 shadow-2xl mb-16">
          <h2 className="text-2xl font-bold mb-8 border-b border-gray-800 pb-4">
            💼 Web3 & Technical Projects
          </h2>

          <div className="space-y-4">

            {/* 프로젝트 카드 1: Web3 Hybrid DApp Portfolio */}
            <div className="border border-gray-700 rounded-xl transition-all">
              <div 
                className={`p-5 cursor-pointer flex justify-between items-center ${openProjectId === 'self-portfolio' ? 'bg-gray-800' : 'hover:bg-gray-800/50'}`}
                onClick={() => setOpenProjectId(openProjectId === 'self-portfolio' ? null : 'self-portfolio')}
              >
                <div>
                  <span className="inline-block text-xs font-semibold py-1 px-3 rounded-full bg-green-500/10 text-green-400 mb-1">
                    Hybrid DApp
                  </span>
                  <h3 className="text-xl font-bold">Web3 Hybrid Portfolio (Current Project)</h3>
                </div>
                <svg className={`w-5 h-5 transition-transform ${openProjectId === 'self-portfolio' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>

              {/* 세부 정보 영역 1 */}
              <div className={`overflow-hidden transition-all duration-300 ${openProjectId === 'self-portfolio' ? 'max-h-96 opacity-100 p-5 pt-0 border-t border-gray-700' : 'max-h-0 opacity-0'}`}>
                <p className="text-gray-400 mb-4">
                  Next.js와 Wagmi를 기반으로 구축된 포트폴리오 DApp입니다. 지갑 연결 유무와 관계없이 Sepolia 테스트넷의 방명록 데이터를 안정적으로 읽어오는 <strong>Cross-Chain Read Stabilization 로직</strong>을 적용했습니다.
                </p>
                <h4 className="text-lg font-semibold mb-2 text-green-300">주요 기술적 성과</h4>
                <ul className="list-disc list-inside text-gray-400 space-y-1 ml-4">
                  <li><strong>ABI/RPC 문제 해결:</strong> viem 라이브러리와 충돌하는 ABI 정의를 수정하고 안정적인 Sepolia RPC를 강제 주입하여 통신 안정화.</li>
                  <li><strong>크로스-체인 읽기(Cross-Chain Read):</strong> `useReadContract`에 `chainId`를 고정하여 사용자가 다른 네트워크(Mainnet 등)에 있어도 Sepolia 데이터 조회 보장.</li>
                </ul>
                <div className="flex flex-wrap gap-2 text-sm mt-4">
                  <span className="bg-gray-700/50 text-gray-300 px-3 py-1 rounded-full">Next.js 14</span>
                  <span className="bg-gray-700/50 text-gray-300 px-3 py-1 rounded-full">Wagmi</span>
                  <span className="bg-gray-700/50 text-gray-300 px-3 py-1 rounded-full">Tailwind CSS</span>
                  <span className="bg-gray-700/50 text-gray-300 px-3 py-1 rounded-full">Sepolia</span>
                </div>
                <a href="https://github.com/jaejin0311/my-web3-portfolio" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-4 inline-block bg-green-600/20 text-green-300 font-semibold py-2 px-4 rounded-lg hover:bg-green-600/30 transition-colors text-sm">
                  GitHub에서 소스 코드 보기 →
                </a>
              </div>
            </div>

            {/* 프로젝트 카드 2: Milestone Escrow Protocol (교체 완료) */}
            <div className="border border-gray-700 rounded-xl transition-all">
              <div 
                className={`p-5 cursor-pointer flex justify-between items-center ${openProjectId === 'escrow' ? 'bg-gray-800' : 'hover:bg-gray-800/50'}`}
                onClick={() => setOpenProjectId(openProjectId === 'escrow' ? null : 'escrow')}
              >
                <div>
                  <span className="inline-block text-xs font-semibold py-1 px-3 rounded-full bg-orange-500/10 text-orange-400 mb-1">
                    Smart Contract
                  </span>
                  <h3 className="text-xl font-bold">Milestone Escrow Protocol</h3>
                </div>
                <svg className={`w-5 h-5 transition-transform ${openProjectId === 'escrow' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>

              {/* 세부 정보 영역 2 */}
              <div className={`overflow-hidden transition-all duration-300 ${openProjectId === 'escrow' ? 'max-h-[500px] opacity-100 p-5 pt-0 border-t border-gray-700' : 'max-h-0 opacity-0'}`}>
                <p className="text-gray-400 mb-4">
                  프리랜서 및 외주 용역의 <strong>'납품-검수-정산' 프로세스</strong>를 스마트 컨트랙트로 자동화하여 신뢰 비용을 제거한 에스크로 데모입니다. 상태 머신(State Machine) 패턴을 통해 중개자 없는 안전한 정산을 보장합니다.
                </p>
                <h4 className="text-lg font-semibold mb-2 text-orange-300">주요 기능 및 아키텍처</h4>
                <ul className="list-disc list-inside text-gray-400 space-y-1 ml-4">
                  <li><strong>State Machine Logic:</strong> Pending → Submitted → Paid 상태 흐름을 컨트랙트로 강제.</li>
                  <li><strong>Codespaces 호환 아키텍처:</strong> Next.js API Route를 프록시로 사용하여 브라우저 지갑 제한을 우회하는 서버 사이드 서명 구현.</li>
                  <li><strong>Robust Testing:</strong> Foundry를 이용한 Happy Path 및 예외 상황(Edge Case) 검증 완료.</li>
                </ul>
                <div className="flex flex-wrap gap-2 text-sm mt-4">
                  <span className="bg-gray-700/50 text-gray-300 px-3 py-1 rounded-full">Solidity 0.8.20</span>
                  <span className="bg-gray-700/50 text-gray-300 px-3 py-1 rounded-full">Foundry</span>
                  <span className="bg-gray-700/50 text-gray-300 px-3 py-1 rounded-full">Next.js</span>
                  <span className="bg-gray-700/50 text-gray-300 px-3 py-1 rounded-full">Viem</span>
                </div>
                <a href="https://github.com/jaejin0311/milestone-escrow-protocol" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-4 inline-block bg-orange-600/20 text-orange-300 font-semibold py-2 px-4 rounded-lg hover:bg-orange-600/30 transition-colors text-sm">
                  GitHub에서 소스 코드 보기 →
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* 핵심 스킬셋 */}
        <section id="skills" className="bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8 shadow-2xl mb-16">
          <h2 className="text-2xl font-bold mb-8 border-b border-gray-800 pb-4">
            🛠️ Core Technical Skills
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            
            {/* 스킬 그룹 1: Web3 & Blockchain */}
            <div className="p-4 bg-gray-950 rounded-lg border border-gray-700/50">
              <h3 className="text-lg font-semibold text-blue-400 mb-3 flex items-center gap-2">
                <FaCode className="text-xl"/> Blockchain / Web3
              </h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li className="flex items-center gap-2"><SiSolidity className="text-base text-gray-500"/> Solidity (Smart Contract)</li>
                <li className="flex items-center gap-2"><FaLink className="text-base text-gray-500"/> EVM, Sepolia Testnet</li>
                <li className="flex items-center gap-2"><FaLink className="text-base text-gray-500"/> Wagmi, Viem</li>
                <li className="flex items-center gap-2"><FaLink className="text-base text-gray-500"/> Hardhat / Foundry (Tooling)</li>
              </ul>
            </div>

            {/* 스킬 그룹 2: Frontend & Core Tech */}
            <div className="p-4 bg-gray-950 rounded-lg border border-gray-700/50">
              <h3 className="text-lg font-semibold text-blue-400 mb-3 flex items-center gap-2">
                <FaLaptopCode className="text-xl"/> Frontend / Core
              </h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li className="flex items-center gap-2"><SiTypescript className="text-base text-blue-500"/> TypeScript, JavaScript</li>
                <li className="flex items-center gap-2"><SiNextdotjs className="text-base"/> Next.js (App Router)</li>
                <li className="flex items-center gap-2"><FaLink className="text-base text-gray-500"/> React, Zustand</li>
                <li className="flex items-center gap-2"><SiTailwindcss className="text-base text-cyan-400"/> Tailwind CSS, SCSS</li>
              </ul>
            </div>
            
            {/* 스킬 그룹 3: Backend & DevOps */}
            <div className="p-4 bg-gray-950 rounded-lg border border-gray-700/50">
              <h3 className="text-lg font-semibold text-blue-400 mb-3 flex items-center gap-2">
                <FaTools className="text-xl"/> PM / DevOps
              </h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li className="flex items-center gap-2"><FaLink className="text-base text-gray-500"/> Project Management (Agile)</li>
                <li className="flex items-center gap-2"><FaLink className="text-base text-gray-500"/> Architecture Design</li>
                <li className="flex items-center gap-2"><TbGitBranch className="text-base text-red-500"/> Git & <FaGithub className="text-base"/> GitHub</li>
                <li className="flex items-center gap-2"><SiPostgresql className="text-base text-blue-600"/> PostgreSQL, <SiMongodb className="text-base text-green-500"/> MongoDB</li>
              </ul>
            </div>
          </div>
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
      
        <footer className="border-t border-gray-800 py-8 mt-16 text-center text-gray-500 text-sm">
          <div className="max-w-4xl mx-auto px-6">
            <p>&copy; {new Date().getFullYear()} Jaejin Kim. All Rights Reserved.</p>
            <p className="mt-2">
              <a href="mailto:jaejin.kim0311@gmail.com" className="hover:text-blue-400 transition-colors">Email</a> | 
              <a href="https://github.com/jaejin0311" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors ml-2">GitHub</a>
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}