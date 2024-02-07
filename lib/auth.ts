import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions, getServerSession } from "next-auth";
import { db } from "./db";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.username = token.username as string;
        session.user.createdDate = token.createdDate as string;
        session.user.quizzesAnswered = token.quizzesAnswered as number;
        session.user.tutorQuestions = token.tutorQuestions as number;
        session.user.plan = token.plan as string;
      }

      return session;
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (!dbUser) {
        token.id = user!.id;
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
        username: dbUser.username,
        createdDate: dbUser.createdDate,
        quizzesAnswered: dbUser.quizzesAnswered,
        tutorQuestions: dbUser.tutorQuestions,
        plan: dbUser.plan,
      };
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const getAuthSession = () => getServerSession(authOptions);
