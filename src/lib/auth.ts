import { db } from '@/db'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg', // or "pg" or "mysql"
    //usePlural: true,
  }),
  user: {
    modelName: 'userTable',
  },
  account: {
    modelName: 'accountTable',
  },
  session: {
    modelName: 'sessionTable',
  },
})
