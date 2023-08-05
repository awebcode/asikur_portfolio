import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials"
import FacebookProvider from "next-auth/providers/facebook";
import appleProvider from "next-auth/providers/apple";
import TwitterProvider from "next-auth/providers/twitter";
import InstragramProvider from "next-auth/providers/instagram";

import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

import clientPromise from "@/lib/mongodb";
import User from "@/models/userModel";
import db from "@/utils/db";

import Chat from "@/models/chatModel";
import { compare, hash } from "bcryptjs";
import Message from "@/models/messageModel";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      scope: "user:email=null",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      scope: "user:email",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      scope: "user:email",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),

    TwitterProvider({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log("credentials", credentials);

        const { name, email, password, image } = credentials;

        let user1;
        db();
        const existsUser = await User.findOne({ email: email }).select("+password");

        if (existsUser) {
          console.log("credp1", credentials.password);
           const checkPassword = await existsUser.comparePassword(password);
          // const checkPassword = await compare(password, existsUser.password);

          // console.log("checkp:,", checkPassword, existsUser.password);

          // incorrect password
          if (!checkPassword) {
            throw new Error("Password doesn't match");
            // return res.json({ error: "Username or Password doesn't match" });
          }
          if (existsUser.email !== credentials.email) {
            throw new Error("Email doesn't match");
            // return res.json({ error: "Username or Password doesn't match" });
          }
          return (user1 = existsUser);
        } else if (!name || !image) {
          throw new Error("User doesn't exist.");

        } else {
          if (!name || !email || !password || !image) {
            throw new Error("Plese Fill All The Fields");
          } else {
            // console.log("credp2", credentials.password);
            // const hasppassword = await hash(password, 12);
            user1 = await User.create({
              name,
              email,
              password, //: hasppassword
              image,
            });
            var chatData = {
              chatName: "sender",
              isGroupChat: false,
              users: [user1._id, "642a0a448e99684e92b84cf9"], //642a0a448e99684e92b84cf9 /admin id
            };
           const chat=   await Chat.create(chatData);
            var newMessage = {
              sender: "642a0a448e99684e92b84cf9", //result._id
              content: `Subject: Important Announcement from Admin:<br>Dear valued user,<br>We hope this message finds you in good health and high spirits. As the administrator of this platform, we would like to convey an important announcement that concerns all of our users.Firstly,we would like to express our heartfelt appreciation for your continued support and trust in our platform. Your active participation and engagement have been the driving force behind the success of our community.We are excited to share with you that we have been working diligently to enhance your user experience and take our platform to new heights. Our dedicated team has been listening attentively to your feedback and suggestions, and we are now ready to introduce a series of significant updates and improvements.In the coming weeks, you can expect to see a range of enhancements aimed at providing you with a smoother, more intuitive, and enjoyable experience. We have focused on improving the overall performance, speed, and responsiveness of the platform. Additionally, we have implemented advanced security measures to ensure the utmost protection of your personal information.We understand that change can sometimes be challenging, but we firmly believe that these updates will elevate your user experience to new levels of satisfaction. Our goal is to create a platform that caters to your needs and aspirations, and we are confident that these changes will bring us closer to that vision.We value your trust and partnership, and we are committed to maintaining open lines of communication. Your feedback and suggestions are always welcomed and highly valued. We encourage you to share your thoughts and ideas with us as we continue to evolve and improve.Thank you for being a part of our vibrant community. We are immensely grateful for your support and look forward to serving you even better in the future.If you have any immediate concerns or require assistance, please do not hesitate to contact our dedicated support team. They are ready to address any questions or issues you may have.Warm regards,[Contact:<span>Email:asikurrahaman997@gmail.com</span>,Whatsapp:01893585782<span>[Admin Asikur Rahman][Asikur Personal Portfolio & Blog Website NextJs.]</span>`,
              chat: chat._id,
            };
            await Message.create(newMessage);
            const admin = await User.findById("642a0a448e99684e92b84cf9");
            const messagenotification = {
              message: `You Have A New Message From ${admin.name}`,
              user: admin._id,
              chat: chat._id,
              path: `/user/profile/${admin._id}`,
              createdAt: new Date(),
            };

            await User.findByIdAndUpdate(user1._id, {
              $push: {
                messagenotification,
              },
            });
          }
        }
        // console.log("created user", user1);
        const user = user1;
        // console.log("session credential user", user);
        // If no error and we have user data, return it
        if (user) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],

  session: {
    jwt: true,
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.SECRET,
  },
  // database: process.env.MONGO_URL,

  secret: process.env.SECRET,
  callbacks: {
    async session({ session, token, user }) {
      // console.log("session", session, token, user);

      if (session?.user) {
        session.user.id = token.sub;
        // session.user.emailVerified = user.emailVerified;
        // session.user.avatar = user.image;
      }

      return session;
    },
  },
  // database: process.env.MONGODB_URL,
  adapter: MongoDBAdapter(clientPromise),
});
