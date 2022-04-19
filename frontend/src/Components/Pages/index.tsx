import Messenger from "../Messenger";
import Section from "./Section";

const index = ({ socket }: { socket: any }) => {
  return (
    <>
      <Messenger socket={socket} />
      <Section />
    </>
  );
};

export default index;
