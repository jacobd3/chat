import { SetStateAction } from "react";
import styles from "./Input.module.scss";

interface Props {
  id: string;
  placeholder: string;
  inputValue: string;
  setInputValue: React.Dispatch<SetStateAction<string>>;
}

export default function Input({
  id,
  placeholder,
  inputValue,
  setInputValue,
}: Props) {
  return (
    <>
      <input
        id={id}
        className={styles.input}
        placeholder={placeholder}
        type="text"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      ></input>
    </>
  );
}
