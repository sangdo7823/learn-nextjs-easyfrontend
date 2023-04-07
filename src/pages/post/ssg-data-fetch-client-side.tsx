import Header from '@/components/common/header'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

export interface SSGDataFetchClientSideProps {}

export default function SSGDataFetchClientSide(props: SSGDataFetchClientSideProps) {
	const [postList, setPostList] = React.useState([])
    const router = useRouter()
    const page  = router.query?.page;
    console.log('Query: ', router.query)
	React.useEffect(() => {
        if(!page) return
		;(async () => {
			const response = await fetch(`https://js-post-api.herokuapp.com/api/posts?_page=${page}`)
			const data = await response.json()
			setPostList(data.data)
		})()
	},[page])
    function handlerNextClick(){
        const pageIndex  = Number(page??'1');
        router.push({
            pathname:'/post/ssg-data-fetch-client-side',
            query:{
                page:pageIndex + 1
            }
        });
    }
    function handlerPreviousClick(){
        const pageIndex  = Number(page??'1');
        if (pageIndex > 1){ 
            router.push({
                pathname:'/post/ssg-data-fetch-client-side',
                query:{
                    page: pageIndex - 1
                }
            });
        }
    }
	return (
		<div>
			<h1>NextJS: 02-08 SSG and Data Fetching on client side</h1>
			<Header />
			<ul>
				{postList.map((post: any) => (
					<li key={post.id}>
						<Link href={`/post/${post.id}`}>{post.title}</Link>
					</li>
				))}
			</ul>
            <button onClick={handlerPreviousClick}> Previous</button><button onClick={handlerNextClick}>Next</button>
		</div>
	)
}
export async function getStaticProps() {
    console.log('get static props')
    return {
        props:{},
    }
    
}