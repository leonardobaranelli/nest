import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      mail: string;
      password: string;
      address: string;
    };
  }
}
