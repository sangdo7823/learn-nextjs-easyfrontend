import { EmptyLayout } from '@/components/layout'
import { AppPropsWithLayout } from '@/models'
import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppPropsWithLayout) {
	console.log('App re-render')
	const Layout = Component.Layout ?? EmptyLayout

	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	)
}
