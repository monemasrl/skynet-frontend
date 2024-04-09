import Image from "next/image";
import style from "./style.module.scss";
import { RxHamburgerMenu } from "react-icons/rx";
import Drawer from "../drawer/drawer";
import { Dispatch, SetStateAction, useState } from "react";

import { TbDashboard } from "react-icons/tb";
import { useMediaQuery } from "@mui/material";
import { MEDIAQUERIES } from "@/app/utility/variabili";
import { FaRegUserCircle } from "react-icons/fa";
import { useAuth } from "react-oidc-context";
import { redirect } from "next/navigation";

function NavBar({
  setDrawerCharts,
  role,
}: {
  setDrawerCharts: Dispatch<SetStateAction<boolean>>;
  role: string;
}) {
  const [drawer, setDrawer] = useState(false);
  const isLandscape = useMediaQuery(MEDIAQUERIES.landscape);
  const sessionData = useAuth();
  console.log(sessionData, "sessionData");
  return (
    <>
      <div className={style.poweredBy}>
        <Image
          src="/images/pbskynet.png"
          width={137}
          height={46}
          alt="powered by skynet"
        />
      </div>
      <nav className={style.navbar}>
        <div className={style.navbar__user}>
          {sessionData?.user?.url_state ? (
            <Image
              src="/images/logotest.png"
              width={70}
              height={70}
              alt="logo cliente"
            />
          ) : (
            <div className={style.imagePlaceholder}>
              <FaRegUserCircle />
            </div>
          )}
          <div className={style.navbar__user__info}>
            <div className={style.navbar__user__info__label}>User</div>
            <div className={style.navbar__user__info__username}>
              {sessionData.user?.profile.name}
            </div>
          </div>
        </div>
        <div className={style.navbar__ui}>
          <ul className={style.navbar__navLink}>
            <li className={style.burger} onClick={() => setDrawer(true)}>
              <RxHamburgerMenu />
            </li>
          </ul>
        </div>
      </nav>
      <Drawer isOpen={drawer} setIsOpen={setDrawer}>
        <button
          className="btn-generic"
          onClick={() => {
            sessionData.removeUser();
          }}
        >
          logout
        </button>
      </Drawer>
    </>
  );
}
export default NavBar;
