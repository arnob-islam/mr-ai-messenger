import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ color: "white" }}>
              Ai Messenger
            </Link>
          </Typography>
          <Link to="/admin/dashbord" style={{ color: "white" }}>
            {/* <Button color="inherit"  >Monitize</Button> */}
            Monitize
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
