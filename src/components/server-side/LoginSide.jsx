import { Grid } from "@mui/material";

const LoginSide = () => {
  return (
    <>
      <Grid
        className="bg-tech"
        item
        xs={false}
        sm={4}
        md={6}
        sx={{
          backgroundImage: `url('./images/Ai-image-logo.jpeg')`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          objectFit: "cover",
          backgroundPosition: "center",
        }}
      />
    </>
  );
};

export default LoginSide;
