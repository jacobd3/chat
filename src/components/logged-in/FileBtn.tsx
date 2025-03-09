import { IconButton } from "@mui/material";
import { UploadFile } from "@mui/icons-material";
import { SetStateAction, useState } from "react";

type Props = {
  setFile: React.Dispatch<SetStateAction<File | null>>;
};

export default function FileBtn({ setFile }: Props) {
  const [fileName, setFileName] = useState<string>("Avatar not attached");

  function changeFileHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFile(file);
    }
  }
  return (
    <>
      <IconButton component="label">
        <UploadFile />
        <input type="file" hidden onChange={changeFileHandler} />
      </IconButton>
      <p>{fileName}</p>
    </>
  );
}
