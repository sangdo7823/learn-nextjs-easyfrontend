import { GetStaticPathsContext, GetStaticProps } from 'next';
import Link from 'next/link';
import * as React from 'react';

export interface PostIndexPageProps {
    posts: any[]
}

export default function PostIndexPage ({posts}: PostIndexPageProps) {
  return (
    <div>
      <h1>Post Index</h1>

      <ul>
            {posts.map(post=>
            <li key={post.id}>
                <Link href={`/post/${post.id}`} passHref>
                    <div>
                        <h2>{post.title}</h2>
                        <span>{post.author}</span> 
                    </div>
                </Link>
                
                </li>
            )}
      </ul>
    </div>
  );
}
export const getStaticProps: GetStaticProps<PostIndexPageProps> = async (context: GetStaticPathsContext)=>{
    // server-side
    //build-time
    console.log('statis props')
    const response = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1')
    const data = await response.json();
    console.log(data);
    return {
        props:{ 
            posts: data.data.map((x:any)=>({id:x.id, title:x.title, author:x.author, description:x.description}))
        },
    }
}
//không sử dụng với getServerSideProps chỉ dùng 1 trong 2

//https://js-post-api.herokuapp.com/api/posts?_page=1