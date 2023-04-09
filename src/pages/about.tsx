// import Header from '@/components/common/header';
import { MainLayout } from '@/components/layout'
import { NextPageWithLayout } from '@/models'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React from 'react'
const Header = dynamic(() => import('@/components/common/header'), { ssr: false })
export interface AboutPageProps {}
const About: NextPageWithLayout = (props: AboutPageProps) => {
	const router = useRouter()
	function goToProduct() {
		router.push({
			pathname: '/product/[productId]',
			query: {
				productId: 123,
				ref: 'social',
			},
		})
	}
	return (
		<>
			<h1>About Page</h1>
			<button onClick={goToProduct}>Go to Product</button>
			<Header />
		</>
	)
}
About.Layout = MainLayout
export default About
