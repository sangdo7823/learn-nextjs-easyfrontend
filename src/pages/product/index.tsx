import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
export interface ProductPageProps {
}

export default function ProductPage (props: ProductPageProps) {
 const router = useRouter();
 console.log('query: ', router.query)
  return (
    <div>
      Products
      <div>
        <ul>
            <li>
                <Link href="/product/create" prefetch>
                    Create
                </Link>
            </li> 
            <li>
                <Link href="/product/123">
                    View Id 123
                </Link>
            </li> 
            <li>
                <Link href="/product/321">
                    View Id 321
                </Link>
            </li> 
            <li>
                <Link href="/product/chuyen-muc/product-name-id.html?preview=true">
                    Sản phẩn id with slug
                </Link>
            </li> 
            <li>
                <Link href="/about" passHref>
                    <button>About Us</button>
                </Link>
            </li> 
            <li>
                <Link href="/about">
                    <button>About Us</button>
                </Link>
            </li> 
            <li>
                <Link href="/about" replace>
                    About us
                </Link>
            </li> 
        </ul>
      </div>
    </div>
  );
}