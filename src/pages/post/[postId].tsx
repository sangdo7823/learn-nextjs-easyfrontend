import { GetStaticPaths, GetStaticPathsContext, GetStaticProps, GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import * as React from 'react'

export interface PostDetailPageProps {
	post: any
}

export default function PostDetailPage({ post }: PostDetailPageProps) {
	const router = useRouter()
	if (router.isFallback) {
		return <div> Loading ... </div>
	}
	return (
		<div>
			<h1>Post Detail Page</h1>
			<p> Query: {JSON.stringify(router.query)}</p>
			<p>{post.title}</p>
			<p>{post.author}</p>
			<p>{post.description}</p>
		</div>
	)
}
export const getStaticPaths: GetStaticPaths = async () => {
	console.log('\nget static paths')
	const response = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1')
	const data = await response.json()

	return {
		paths: data.data.map((post: any) => ({ params: { postId: post.id } })),
		fallback: true,
	}
}
export const getStaticProps: GetStaticProps<PostDetailPageProps> = async (
	context: GetStaticPropsContext
) => {
	// server-side
	//build-time
	console.log('\nget statis props', context.params?.postId)
	const postId = context.params?.postId
	if (!postId) return { notFound: true }
	const response = await fetch(
		`https://js-post-api.herokuapp.com/api/posts/${context.params?.postId}`
	)
	const data = await response.json()
	//console.log(data);
	return {
		props: {
			post: data,
		},
		revalidate: 5,
	}
}
//không sử dụng với getServerSideProps chỉ dùng 1 trong 2

//https://js-post-api.herokuapp.com/api/posts?_page=1
