import { authRouter } from "./auth-router"
import { publicProcedure, router } from "./trpc"

export const appRouter = router({

    // anyApiRoute: publicProcedure.query(() => {
    //     return 'hello'
    // }),
    auth: authRouter
})

export type AppRouter = typeof appRouter