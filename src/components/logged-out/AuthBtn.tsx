import Button from "@mui/material/Button";

interface AuthBtnProps {
  caption: string;
}

export default function AuthBtn({ caption }: AuthBtnProps) {
  return (
    <Button
      type="submit"
      variant="contained"
      sx={{
        color: "white",
        padding: "0.7rem 2rem",
        font: "inherit",
        fontSize: "1.2rem",
        borderRadius: "10px",
        boxShadow: "none",
        background: "#385076",
      }}
    >
      {caption}
    </Button>
  );
}
