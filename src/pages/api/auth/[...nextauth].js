import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: '599517416548-pdjosnbh3omrpvb8211cd71qb4ghd75i.apps.googleusercontent.com',
      clientSecret: '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'
    })
  ],
  callbacks: {
    async session ({ session, token }) {
      session.user.tag = session.user.name
        .split(' ')
        .join('')
        .toLocaleLowerCase()

      session.user.uid = token.sub
      return session
    }
  },
  secret: 'SecrectKeyAuth'
}

export default NextAuth(authOptions)
