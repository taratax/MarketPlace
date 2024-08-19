"use client"
import React, { PropsWithChildren, ReactNode, useState } from 'react'
import {QueryClient} from "@tanstack/react-query"
import { trpc } from '@/trpc/client'
import { httpBatchLink } from '@trpc/client'
import { QueryClientProvider} from '@tanstack/react-query'


const Providers = ({children}: {children: ReactNode}) => {

    const [queryClient] = useState(() => new QueryClient())
    const [trpcClient] = useState( () => trpc.createClient({
        links: [
            httpBatchLink({
                url: `${process.env.NEXT_PUBLIV_SERVER_URL}/api/trpc`,
                fetch(url, options) {
                    return fetch(url, {
                        ...options,
                        credentials: 'include',
                    })
                }
            })
        ]
    }) 
)

  return (
   <trpc.Provider client={trpcClient} queryClient={queryClient}>
       <QueryClientProvider client={queryClient}>
        {children}
       </QueryClientProvider>
   </trpc.Provider>
  )
}

export default Providers