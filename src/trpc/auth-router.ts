import {publicProcedure, router } from "./trpc";
import { getPayLoadClient } from "../get-payload";
import { AuthCredentialsValidator } from "../lib/validators/account-credentials-validator";
import { TRPCError } from "@trpc/server";

export const authRouter = router({
    
    createPayloadUser: publicProcedure.input(AuthCredentialsValidator).mutation( async ({input}) => {

        const { email, password } = input
        const payload = await getPayLoadClient()

        const {docs: users} = await payload.find({
            collection: "users",
            where: {
                email: {
                    equals: email,
                },
            },
        })
        if (users.length !== 0) throw new TRPCError({code: 'CONFLICT'})

        await payload.create({
            collection: "users",
            data: {},
        })
    }),
})