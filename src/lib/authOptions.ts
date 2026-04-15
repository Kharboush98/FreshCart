import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode, JwtPayload } from "jwt-decode"
import { console } from "inspector";

interface AuthJwt extends JwtPayload{
  id?:string
}

export const authOptions: NextAuthOptions = {
    pages:{
        signIn: "/login"
    },

  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        console.log(data);


        if(data.message == "success")
        {
            const decodedToken = jwtDecode<AuthJwt>(data.token);
            console.log(decodedToken , "decoded ttoken name");

            return {
                id: decodedToken?.id ?? decodedToken?.sub ?? "",
                user : data.user,
                token : data.token,
            }

        } else {
            //error
            throw new Error(data.message || "something went wrong")
        }

      },
    }),
  ],

  callbacks : {

    async jwt({ token, user }) {
        
        if(user){
            token.user = user.user;
            token.token = user.token;
        }

      return token
    },

    async session({ session, token }) {

        if(token){
            session.user = token.user ;
        }

      return session
    },


  },
};
