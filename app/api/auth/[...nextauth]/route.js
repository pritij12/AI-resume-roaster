import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

// Login with GitHub. NextAuth creates the login pages and handles everything.
const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  session: { strategy: 'jwt' },
});

export { handler as GET, handler as POST };
