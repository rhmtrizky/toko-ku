import { loginWithGithub, loginWithGoogle, signIn } from '@/services/auth/services';
import { compare } from 'bcrypt';
import nextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import jwt from 'jsonwebtoken';

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const user: any = await signIn(email);
        if (user) {
          const passwordConfirm = await compare(password, user.password);
          if (passwordConfirm) {
            return user;
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }: any) {
      if (account?.provider === 'credentials') {
        token.email = user.email;
        token.fullname = user.fullname;
        token.phoneNumber = user.phoneNumber;
        token.password = user.password;
        token.role = user.role;
        token.id = user.id;
        token.image = user.image;
      }

      if (account?.provider === 'google') {
        const data = {
          email: user.email,
          image: user?.image,
          fullname: user.name,
          phoneNumber: '',
          type: 'google',
        };

        await loginWithGoogle(data, (data: any) => {
          token.email = data.email;
          token.fullname = data.fullname;
          token.phoneNumber = data.phoneNumber;
          token.image = data?.image;
          token.role = data.role;
          token.id = data.id;
        });
      }

      if (account?.provider == 'github') {
        const data = {
          email: user?.email,
          image: user?.image,
          fullname: user?.name,
          phoneNumber: '',
          type: 'github',
        };

        await loginWithGithub(data, (data: any) => {
          token.email = data.email;
          token.fullname = data.fullname;
          token.phoneNumber = data.phoneNumber;
          token.image = data?.image;
          token.role = data.role;
        });
      }
      return token;
    },
    async session({ session, token }: any) {
      if ('email' in token) {
        session.user.email = token.email;
      }
      if ('fullname' in token) {
        session.user.fullname = token.fullname;
      }
      if ('phoneNumber' in token) {
        session.user.phoneNumber = token.phoneNumber;
      }
      if ('password' in token) {
        session.user.password = token.password;
      }
      if ('role' in token) {
        session.user.role = token.role;
      }
      if ('id' in token) {
        session.user.id = token.id;
      }
      if ('image' in token) {
        session.user.image = token.image;
      }
      const accessToken = jwt.sign(token, process.env.NEXTAUTH_SECRET || '', {
        algorithm: 'HS256',
      });
      session.accessToken = accessToken;

      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
  },
};

export default nextAuth(authOptions);
