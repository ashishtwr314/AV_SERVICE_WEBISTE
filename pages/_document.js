import Document, { Html, Head, Main, NextScript } from 'next/document';
import { DOMAIN_URL } from '../config/index';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
            {/* import external javascript */}
            <script type="text/javascript" src={ DOMAIN_URL + `/js/aos.js`}></script>
            <script type="text/javascript" src={ DOMAIN_URL + `/js/feather.min.js`}></script>
            <script type="text/javascript" src={ DOMAIN_URL + `/js/plugins.init.js`}></script>
            <script type="text/javascript" src={ DOMAIN_URL + `/js/app.js`}></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument