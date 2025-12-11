# 🚀 Jaejin Kim | Decentralized Portfolio

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://portfolio-3r4py5v91-jaejinkim0311-gmailcoms-projects.vercel.app/)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Web3](https://img.shields.io/badge/Web3-RainbowKit-multicolor?style=flat-square)
![Solidity](https://img.shields.io/badge/Solidity-In%20Progress-gray?style=flat-square&logo=solidity)

## 👋 Introduction

**"A Portfolio that lives on the Blockchain."**

Welcome to my portfolio website. Unlike traditional static websites, this project is designed as a **Hybrid DApp (Decentralized Application)**. It demonstrates how Web 3.0 technologies can be integrated into a user-friendly Web 2.0 interface.

This project is built to prove my capability as a **Bilingual Smart Contract Engineer & Technical PM**, bridging the gap between technical implementation and business strategy.

---

**"블록체인 위에 살아있는 포트폴리오입니다."**

제 포트폴리오 웹사이트에 오신 것을 환영합니다. 이 프로젝트는 단순한 정적 웹사이트가 아니라, **하이브리드 DApp**으로 설계되었습니다. Web 3.0 기술이 어떻게 일반 사용자 인터페이스(Web 2.0)에 자연스럽게 녹아들 수 있는지 증명하기 위해 제작되었습니다.

기술 구현과 비즈니스 전략을 연결하는 **스마트 컨트랙트 엔지니어이자 테크니컬 PM**으로서의 역량을 보여주는 프로젝트입니다.

<br/>

## 🛠 Tech Stack

| Category | Technology | Reasoning (Why I chose this) |
| :--- | :--- | :--- |
| **Frontend** | **Next.js 14** (App Router) | SEO optimization and server-side rendering for better performance. |
| **Language** | **TypeScript** | Type safety to prevent runtime errors and improve code maintainability. |
| **Styling** | **Tailwind CSS** | Rapid UI development and consistent design system. |
| **Web3 Auth** | **RainbowKit + Wagmi** | Best-in-class UX for wallet connection (Metamask, WalletConnect). |
| **Blockchain** | **Solidity** (Coming Soon) | Smart contract for on-chain guestbook features. |
| **Deployment** | **Fleek (IPFS)** (Planned) | Censorship-resistant hosting on the decentralized web. |

<br/>

## ✨ Key Features

### 1. Web3 Authentication (Implemented)
- Users can connect their crypto wallets (Metamask, etc.) via **RainbowKit**.
- Supports multiple chains (Ethereum Mainnet, Polygon, Sepolia Testnet).
- **UX Consideration:** Designed to be accessible even for users without wallets (Read-only mode).

### 2. On-Chain Guestbook (In Progress)
- A decentralized guestbook where visitors can leave immutable messages.
- Interactions are recorded on the Ethereum blockchain via Smart Contracts.

### 3. Decentralized Hosting (Planned)
- This website will be hosted on **IPFS** via Fleek, ensuring 100% uptime and data integrity.

<br/>

## 🚀 Getting Started

If you want to run this project locally:

```bash
# 1. Clone the repository
git clone [https://github.com/YOUR_GITHUB_ID/my-web3-portfolio.git](https://github.com/YOUR_GITHUB_ID/my-web3-portfolio.git)

# 2. Install dependencies
npm install

# 3. Run the development server
npm run dev
```

## 🗺 Roadmap

[x] Phase 1: Project Setup & Wallet Connection (RainbowKit Integration)

[x] Phase 2: Smart Contract Development (Solidity Guestbook) & Testing

[x] Phase 3: UI/UX Design Implementation

[x] Phase 4: IPFS Deployment & ENS Domain Connection

📬 Contact
Email: jaejin.kim0311@gmail.com

GitHub: github.com/jaejin0311

LinkedIn: linkedin.com/in/jaejink

## 📝 Dev Log

- **2025-12-11(Latest)**: **Production Deployment & Build Optimization (Vercel)**
  - **Challenge:** Encountered persistent `Module not found` errors (`pino`, `thread-stream`, `tap`) during Vercel deployment. Identified conflict between Next.js 16's default Turbopack and deep dependencies of WalletConnect.
  - **Solution:**
    1.  **Build Configuration:** Enforced Webpack (`next build --webpack`) in `package.json` to bypass Turbopack's strict module resolution for legacy libs.
    2.  **Webpack Aliasing:** Configured `next.config.ts` with `resolve.alias` to map server-side only logging libraries (`pino`, `thread-stream`) to `false`, effectively removing them from the client bundle.
  - **Result:** Successfully deployed to Vercel with 100% functionality.
- **2025-12-11**: **Web3 Data Stability and Cross-Chain Read Finalized**
  - **Issue Resolution (Critical):** Resolved critical **`ContractFunctionExecutionError`** caused by ABI definition structure (`tuple[]` vs `struct[]`) incompatibility with the `viem` library. Stabilized ABI by using the minimal JSON format.
  - **Environment Stability:** Finalized local development environment by addressing `next dev` failure, utilizing `npm install` with aggressive cache removal.
  - **Feature Enhancement:** Implemented **`chainId: sepolia.id`** in `useReadContract` to ensure the Guestbook always displays data, regardless of the user's wallet network (Mainnet, Polygon, etc.). Configured `providers.tsx` to prioritize the Sepolia RPC, ensuring non-wallet users can also see the guestbook messages.

- **2025-12-09**: **Initial Web3 Integration and Environment Troubleshooting**
  - Implemented `useReadContract` and `useWriteContract` for the Guestbook.
  - **Issue:** Data read failed initially unless the wallet was manually connected to Sepolia.
  - **Troubleshooting:** Identified the issue as complex environment instability (likely Codespaces HMR/caching issues) combined with RPC connection failures. Used `git reset --hard` and environment cleanup (`rm -rf node_modules`) to revert to a stable codebase.

- **2025-12-06**: 프로젝트 초기 세팅 및 지갑 연결 구현
  - `Next.js 14` + `RainbowKit` 환경 구축 (Codespaces 활용)
  - `Guestbook.sol` 스마트 컨트랙트 작성 (Remix VM 배포 테스트)
  - **Issue**: 메인넷 연결 시 가스비 문제 발생 → Remix VM으로 우회하여 로직 검증 완료.