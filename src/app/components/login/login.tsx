import { redirect } from "next/navigation";
import Image from "next/image";
import style from "./style.module.scss";
import { motion } from "framer-motion";
import { useAuth } from "react-oidc-context";

function LoginBtn() {
  const auth = useAuth();

  switch (auth.activeNavigator) {
    case "signinSilent":
      return <div>Signing you in...</div>;
    case "signoutRedirect":
      return <div>Signing you out...</div>;
  }

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Oops... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    redirect("/dashboard");
  }

  return <button onClick={() => void auth.signinRedirect()}>Log in</button>;
}
function Login() {
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
        <LoginBtn />
      </motion.section>
    </motion.section>
  );
}

export default Login;
