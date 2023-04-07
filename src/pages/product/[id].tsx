import * as React from 'react';
import { useRouter } from 'next/router'

export interface ProductItemPageProps {
}

export default function ProductItemPage (props: ProductItemPageProps) {
    
    const router = useRouter()
   const { id } = router.query
  return (
    <div>
       Product Id {id}
    </div>
  );
}
