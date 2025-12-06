import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-black text-white">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm flex flex-col gap-10">
        
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            Hello, I'm <span className="text-blue-500">Jaejin Kim</span>
          </h1>
          <p className="text-gray-400">
            Bilingual Smart Contract Engineer & Technical PM
          </p>
        </div>

        {/* 지갑 연결 버튼 */}
        <div className="border border-gray-700 p-10 rounded-xl bg-gray-900 flex flex-col items-center gap-5">
          <p className="text-lg font-bold">Web 3.0 Access</p>
          <ConnectButton />
        </div>

      </div>
    </main>
  );
}