import * as React from 'react';
import { useRouter } from 'next/router'

export interface ProductPageDetailProps {
}

export default function ProductPageDetail (props: ProductPageDetailProps) {
    const router = useRouter();
  return (
    <div>
        <h1>Product Page Detail</h1>
        <p>query: {JSON.stringify(router.query)}</p>
    </div>
  );
}
