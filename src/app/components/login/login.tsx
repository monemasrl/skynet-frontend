import { redirect } from "next/navigation";
import Image from "next/image";
import style from "./style.module.scss";
import { signIn, signOut } from "next-auth/react";
import { motion } from "framer-motion";
function Login({ token }: { token: string | null }) {
  return (
    <motion.section
      className={style.login}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
    >
      <motion.header
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Image
          src="/images/skynet.png"
          alt="logo"
          width={297}
          height={107}
          className={style.logo}
        />
      </motion.header>
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <button
          className={style.loginButton}
          onClick={() => signIn("keycloak")}
        >
          Login
        </button>
        {token && (
          <button className={style.loginButton} onClick={() => signOut()}>
            Logout
          </button>
        )}
      </motion.section>
    </motion.section>
  );
}
export default Login;
