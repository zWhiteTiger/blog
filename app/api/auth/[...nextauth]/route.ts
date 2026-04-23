import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { connectDB } from "@/lib/mongoose";
import User from "@/models/User";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,

    session: {
        strategy: "jwt",
        maxAge: 7 * 24 * 60 * 60,
    },

    providers: [
        CredentialsProvider({
            name: "credentials",

            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },

            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                await connectDB();

                const email = credentials.email.toLowerCase();

                const user = await User.findOne({ email });

                if (!user || !user.passwordHash) return null;

                const valid = await bcrypt.compare(
                    credentials.password,
                    user.passwordHash
                );

                if (!valid) return null;

                return {
                    id: user._id.toString(),
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    image: user.avatarUrl,
                };
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.uid = user.id
                token.firstName = user.firstName
                token.lastName = user.lastName
            }
            return token
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.uid!
                session.user.firstName = token.firstName
                session.user.lastName = token.lastName
            }
            return session
        }
    },

    pages: {
        signIn: "/auth/login",
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };