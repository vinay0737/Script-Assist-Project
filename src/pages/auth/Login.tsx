import { useState } from "react";
import { useAuthStore } from "../../store/auth.store";
import { useNavigate } from "react-router-dom";
import { TextInput, PasswordInput, Button } from "@mantine/core";
import { motion } from "framer-motion"; // Import framer-motion
import styles from "./Login.module.scss";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = () => {
    const success = login(username, password);
    if (success) {
      navigate("/"); // Redirect to Landing Page
    } else {
      alert("Invalid credentials! Try admin/password.");
    }
  };

  return (
    <motion.div
      className={styles.loginContainer}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.h2
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Login
      </motion.h2>

      <motion.div
        className={styles.form}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <TextInput
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.inputField}
        />
        <PasswordInput
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.inputField}
        />
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Button className={styles.submitButton} onClick={handleSubmit}>
            Login
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Login;
