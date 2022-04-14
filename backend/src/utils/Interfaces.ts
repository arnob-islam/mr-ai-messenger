interface I_User {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
}
interface I_SocketUser {
  id: string;
  socketId: string;
  ai?: {}[];
}

interface I_AI_Values {
  _id?: string | number;
  question: string;
  answer: string;
}
interface I_AI_Response {
  messages: I_AI_Values;
  ai: I_AI_Values;
}

export { I_User, I_SocketUser, I_AI_Values, I_AI_Response };
