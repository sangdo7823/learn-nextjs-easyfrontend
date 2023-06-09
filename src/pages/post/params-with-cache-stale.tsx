import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import * as React from 'react'
import { setInterval } from 'timers/promises'

export interface PostParamsWithCacheStaleProps {
	query: any
	post: any
}

export default function PostParamsWithCacheStale({ query, post }: PostParamsWithCacheStaleProps) {
	const router = useRouter()
	const [seconds, setSeconds] = React.useState(0)
	React.useEffect(() => {
		const intervalId = window.setInterval(() => {
			setSeconds((x) => {
				if (x > 60) clearInterval(intervalId)
				return x + 1
			})
		}, 1000)

		return () => clearInterval(intervalId)
	}, [])
	return (
		<div>
			<h1>Post Params with Cache</h1>
			<p> Query: {JSON.stringify(router.query)}</p>
			<p>Time: {seconds}s</p>
			<h2>Post detail</h2>
			<p>Title: {post?.title}</p>
		</div>
	)
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
	context.res.setHeader('Cache-Control', 'public, s-maxage=5, stale-while-revalidate')
	// fake slow query
	await new Promise((resolve) => setTimeout(resolve, 3000))

	const postId = context.query.postId
	if (!postId) return { props: { query: context.query } }
	const response = await fetch(`https://js-post-api.herokuapp.com/api/posts/${postId}`)
	const data = await response.json()

	return {
		props: {
			query: context.query,
			post: data,
		},
	}
}
