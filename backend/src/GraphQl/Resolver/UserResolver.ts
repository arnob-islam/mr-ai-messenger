import { I_User } from "../../utils/Interfaces";

const GetUser = () => {
  return {
    success: true,
    message: "here is your user",
    user: {
      firstName: "helow",
    },
  };
};

const SignUpNew = async (_: any, args: I_User) => {
  try {
    const { firstName, lastName, email, password } = args;

    return {
      success: true,
      message: "user created success",
      user: {
        firstName: "arnob",
      },
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const resolver = {
  Query: {
    user: GetUser,
  },
  // Mutation: {
  //   signUp: SignUpNew,
  // },
  // Mutation: {
  //   signUp: SignUpNew,
  // },
};

export default resolver;
