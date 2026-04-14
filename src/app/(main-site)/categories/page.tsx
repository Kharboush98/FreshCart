import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import Link from 'next/link';


export default function Categories() {
  return (
    <>
      <div className='container mx-auto py-4'>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                    <BreadcrumbLink
                        render={<Link href="/">Home</Link>}
                    />
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    
                    <BreadcrumbItem>
                    <BreadcrumbPage>categories</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    </>
  )
}
