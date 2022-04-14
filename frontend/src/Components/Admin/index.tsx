import Navbar from "./Navbar";
import Dashbord from "./Dashbord";

const Index = ({ socket }: { socket: any }) => {
  return (
    <>
      <Navbar />
      <Dashbord socket={socket} />
    </>
  );
};

export default Index;
