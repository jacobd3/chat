import styles from "./AuthInput.module.scss";
import { Dispatch, SetStateAction } from "react";

interface AuthInputProps {
  id: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
}

export default function AuthInput({
  id,
  placeholder,
  type = "text",
  value,
  onChange,
}: AuthInputProps) {
  return (
    <div className={styles.container}>
      <label htmlFor={id}>
        <b>{id}</b>
      </label>
      <input
        id={id}
        className={styles.input}
        placeholder={placeholder}
        required
        onChange={(e) => onChange(e.target.value)}
        type={type}
        autoComplete="on"
        value={value}
      />
    </div>
  );
}
