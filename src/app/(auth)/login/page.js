import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import InsightsIcon from "@mui/icons-material/Insights";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";
import { Container } from "@mui/material";

export default function Home() {
  return (
    <>
      <>
        <Container component="main" maxWidth="xl">
          <Grid
            container
            sx={{ height: "100vh" }}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <CssBaseline />
            <Grid
              className="bg-tech"
              item
              xs={false}
              sm={5}
              md={4}
              component={Paper}
              elevation={6}
              square
              sx={{ display: { xs: "none", sm: "flex" } }}
              overflow={"hidden"}
              // bgcolor={"green"}
              minHeight={"400px"}
              maxHeight={"400px"}
            >
              <Image
                alt="Login Bg"
                src="/images/Ai-image-logo.jpeg"
                width={500}
                height={500}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={7}
              md={6}
              component={Paper}
              elevation={6}
              square
              justifyContent={"center"}
              display={"flex"}
              minHeight={"400px"}
              className="loginFrom-wraper"
            >
              <Box
                sx={{
                  my: 5,
                  mx: 0,
                  minWidth:'300px',
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    mb: 2,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Avatar sx={{ m: 1, bgcolor: "#40bd5c" }}>
                    <InsightsIcon />
                  </Avatar>
                  <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    sx={{
                      fontWeight: 600,
                      letterSpacing: "0.05rem",
                      color: "#40bd5c",
                      textDecoration: "none",
                    }}
                  >
                    AI SignLab
                  </Typography>
                </Box>
                <Typography component="h1" variant="h5" color={"#8b8b8b"}>
                 LOGIN
                </Typography>
                <LoginForm />
                <Copyright />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </>
    </>
  );
}

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        AI-SignLab
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
