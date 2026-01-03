import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { connectDB } from "@/lib/database";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";

const authOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: any): Promise<any> {
        console.log("=".repeat(50));
        console.log("🔐 AUTH DEBUG START");
        console.log("=".repeat(50));
        
        console.log("📧 Email provided:", credentials?.email);
        console.log("🔑 Password provided:", credentials?.password ? "***" : "none");
        
        if (!credentials?.email || !credentials?.password) {
          console.log("❌ Missing credentials");
          return null;
        }

        try {
          // Type assertion to string
          const email = credentials.email as string;
          const password = credentials.password as string;
          
          console.log("\n🔌 Connecting to DB...");
          await connectDB();
          console.log("✅ DB connected");
          
          console.log("\n🔍 Finding user:", email);
          const user = await User.findOne({ email: email });
          
          if (!user) {
            console.log("❌ User not found");
            return null;
          }
          
          if (!user.password) {
            console.log("❌ User has no password field");
            return null;
          }
          
          console.log("\n📦 User found:", user.email);
          console.log("📦 Stored hash:", user.password);
          console.log("📦 Hash length:", user.password.length);
          console.log("📦 Hash prefix:", user.password.substring(0, 30) + "...");
          
          // Test with literal known hash
          console.log("\n🧪 TEST: Known hash verification");
          const knownHash = "$2a$12$4kz7p7Q7p7Q7p7Q7p7Q7p.vXLF2BmHdDdctA9fs1RNJF4pSULKeeVeBMwwSvyCoxafGocjuYbR";
          const testPassword = "password123";
          const testResult = await bcrypt.compare(testPassword, knownHash);
          console.log("✅ Known hash test result:", testResult);
          
          console.log("\n🧪 TEST 2: Compare hashes");
          console.log("Stored hash == Known hash?", user.password === knownHash);
          
          console.log("\n🔑 Comparing actual password...");
          const isPasswordValid = await bcrypt.compare(password, user.password);
          
          console.log("✅ Password comparison result:", isPasswordValid);
          
          if (!isPasswordValid) {
            console.log("\n❌ PASSWORD MISMATCH DETECTED");
            console.log("Entered password:", password);
            console.log("Expected password: password123");
            return null;
          }
          
          console.log("\n✅ Authentication successful for:", user.email);
          console.log("=".repeat(50));
          console.log("🔐 AUTH DEBUG END - SUCCESS");
          console.log("=".repeat(50));
          
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role || "user",
          };
          
        } catch (error) {
          console.error("\n🔥 AUTH ERROR:", error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }: any): Promise<any> {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: any): Promise<any> {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    signUp: "/register",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth(authOptions);