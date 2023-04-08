import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import * as React from 'react'

export interface PostParamsPageProps {}

export default function PostParamsPage(props: PostParamsPageProps) {
	const router = useRouter()
	return (
		<div>
			<h1>Post Params Pages</h1>
			<p>Params query: {JSON.stringify(router.query)}</p>
		</div>
	)
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
	context.res.setHeader('Cache-Control', 's-maxage=5')
	// fake slow query
	await new Promise((resolve) => setTimeout(resolve, 3000))
	return {
		props: {},
	}
}
