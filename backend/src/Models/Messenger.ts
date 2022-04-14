import mongoose from "mongoose";

const MessengerSchema = new mongoose.Schema({
  messages: [
    {
      question: {
        type: String,
      },
      answer: {
        type: String,
      },
    },
  ],
});

const Messenger = mongoose.model("messenger", MessengerSchema);

export default Messenger;
