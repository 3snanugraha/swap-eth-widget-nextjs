import type { NextPage } from 'next'
import Head from 'next/head'
import { FiGlobe } from 'react-icons/fi'
import { Theme, SupportedLocale, SUPPORTED_LOCALES, SwapWidget } from '@uniswap/widgets'

// ↓↓↓ Don't forget to import the widgets' fonts! ↓↓↓
import '@uniswap/widgets/fonts.css'
// ↑↑↑

import styles from '../styles/Home.module.css'
import Web3Connectors from '../components/Web3Connectors'
import { useActiveProvider } from '../connectors'
import { useCallback, useRef, useState } from 'react'
import { JSON_RPC_URL } from '../constants'

const TOKEN_LIST = 'https://gateway.ipfs.io/ipns/tokens.uniswap.org'
const UNI = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984'

const theme: Theme = {
  primary: '#1F4A05',
  secondary: '#5F7D52',
  interactive: '#CBD6BA',
  container: '#D9ECD9',
  module: '#E9F7DF',
  accent: '#8E8B78',
  outline: '#CADDC2',
  dialog: '#FFF',
  fontFamily: 'Nunito',
  borderRadius: 0.8,
}

const Home: NextPage = () => {
  // When a user clicks "Connect your wallet" in the SwapWidget, this callback focuses the connectors.
  const connectors = useRef<HTMLDivElement>(null)
  const focusConnectors = useCallback(() => connectors.current?.focus(), [])

  // The provider to pass to the SwapWidget.
  // This is a Web3Provider (from @ethersproject) supplied by @web3-react; see ./connectors.ts.
  const provider = useActiveProvider()


  return (
    <div className={styles.container}>
      <Head>
        <title>Great Swap</title>
        <meta name="description" content="Great Swap" />
        <link rel="icon" href="https://app.uniswap.org/favicon.png" />
      </Head>

      <header className={styles.header}>
        <img src="/assets/g.png" alt="Logo" className={styles.logo} />
      </header>


      <main className={styles.main}>

        <div className={styles.demo}>
          <div className={styles.connectors} ref={connectors} tabIndex={-1}>
            <Web3Connectors />
          </div>

          <div className={styles.widget}>
            <SwapWidget
              jsonRpcEndpoint={JSON_RPC_URL}
              tokenList={TOKEN_LIST}
              provider={provider}
              onConnectWallet={focusConnectors}
              defaultInputTokenAddress="NATIVE"
              defaultInputAmount="1"
              defaultOutputTokenAddress={UNI}
              theme={theme}
            />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
