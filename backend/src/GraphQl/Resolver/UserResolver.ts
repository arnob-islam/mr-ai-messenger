import { I_User } from "../../utils/Interfaces";
// import { Models } from "../../Config/db";
import { v4 as uuidv4 } from "uuid";

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
    // const newUser = await Models.User.create({
    //   id: uuidv4(),
    //   firstName,
    //   lastName,
    //   email,
    //   password,
    // });
    // console.log(newUser);
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
