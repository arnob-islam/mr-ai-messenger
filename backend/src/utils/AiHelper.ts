import { I_AI_Values } from "./Interfaces";
import process from "process";

const ErrorHandaler = () => {
  process.on("unhandledRejection", (err: any) => {
    console.log(err.message);
    process.exit(1);
  });

  process.on("uncaughtException", (err: any) => {
    console.log(err.message);
    process.exit(1);
  });
  return;
};

let EachUserAi: I_AI_Values[] = [
  {
    _id: 1,
    question: "Is it really AI",
    answer: "Yes!",
  },
  {
    _id: 2,
    question: "What it is made of",
    answer: "This AI is build with typescript",
  },
  {
    _id: 3,
    question: "How do I order my project?",
    answer: `upwork: https://www.upwork.com/freelancers/~0155e4f0c10808b4de , fiver: https://www.fiverr.com/arnob008`,
  },
  {
    _id: 4,
    question: "Contact to developer",
    answer: `upwork: https://www.upwork.com/freelancers/~0155e4f0c10808b4de , fiver: https://www.fiverr.com/arnob008`,
  },
];

export { EachUserAi, ErrorHandaler };
