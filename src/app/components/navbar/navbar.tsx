import Image from "next/image";

import style from "./style.module.scss";
import { RxHamburgerMenu } from "react-icons/rx";
import { useSession } from "next-auth/react";
import Drawer from "../drawer/drawer";
import { Dispatch, SetStateAction, useState } from "react";
import { signOut } from "next-auth/react";
import { TbDashboard } from "react-icons/tb";
import { useMediaQuery } from "@mui/material";
import { MEDIAQUERIES } from "@/app/utility/variabili";
import { FaRegUserCircle } from "react-icons/fa";

function NavBar({
  setDrawerCharts,
  role,
}: {
  setDrawerCharts: Dispatch<SetStateAction<boolean>>;
  role: string;
}) {
  const sessionData = useSession();
  const [drawer, setDrawer] = useState(false);
  const isLandscape = useMediaQuery(MEDIAQUERIES.landscape);

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
          {sessionData?.data?.user?.image ? (
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
              {sessionData.data?.user?.name}
            </div>
          </div>
        </div>
        <div className={style.navbar__ui}>
          {isLandscape && role === "manager" && (
            <button
              className={style.buttonCharts}
              onClick={() => setDrawerCharts(true)}
            >
              <TbDashboard /> <span>Charts</span>
            </button>
          )}
          <ul className={style.navbar__navLink}>
            <li className={style.burger} onClick={() => setDrawer(true)}>
              <RxHamburgerMenu />
            </li>
          </ul>
        </div>
      </nav>
      <Drawer isOpen={drawer} setIsOpen={setDrawer}>
        <button className="btn-generic" onClick={() => signOut()}>
          logout
        </button>
      </Drawer>
    </>
  );
}
export default NavBar;
