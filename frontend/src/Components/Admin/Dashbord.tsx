import React, { useEffect } from "react";
import { Box, Container } from "@mui/material";
import { FaUserFriends } from "react-icons/fa";
import UserContent from "./UserContent";

const Dashbord = ({ socket }: { socket: any }) => {
  const [messengerUser, setMessengerUser] = React.useState([]);

  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    socket.emit("admin-go");
  }, [socket]);

  useEffect(() => {
    let subscribe: boolean = true;
    socket.on("all-users", (data: any) => {
      if (subscribe) {
        setMessengerUser(data);
        setLoading(false);
      }
    });
    return () => {
      subscribe = false;
    };
  }, [socket]);

  return (
    <>
      <Banner userLength={messengerUser.length} loading={loading} />
      <UserContent
        data={messengerUser}
        socket={socket}
        setMessengerUser={setMessengerUser}
      />
    </>
  );
};

const Banner = ({
  userLength,
  loading,
}: {
  userLength: number;
  loading: boolean;
}) => {
  return (
    <>
      <Box className="__banner_section" sx={{ my: 4 }} component={"section"}>
        <Container>
          <Box
            className="bannder_wrapper flex jc-s-b ai-c"
            sx={{ px: 4, py: 3 }}
          >
            <Box className="bannder_branding">
              <h1>Total user</h1>
              <div className="svg_container">
                <FaUserFriends size={32} />
              </div>
            </Box>
            <Box className="bannder_user_count">
              <h1>{userLength}</h1>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Dashbord;
