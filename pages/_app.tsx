import React from 'react'
import type { AppProps } from 'next/app'

/**
 * Import global styles
 */
import '../styles/bootstrap.min.css';
import '../styles/style.css';
import '../styles/colors/slateblue.css';
import '../styles/custom_css.css';

import 'antd/dist/antd.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps} />
  )
}

export default MyApp
