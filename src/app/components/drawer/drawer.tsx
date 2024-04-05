"use client";
import style from "./style.module.scss";
import { Dispatch, SetStateAction } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { HiOutlineArrowLongLeft } from "react-icons/hi2";

function Drawer({
  children,
  isOpen,
  setIsOpen,
  title = "",
}: {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  title?: string;
}) {
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.section
            className={style.drawer}
            initial={{ opacity: 0, right: "-100%" }}
            animate={{ opacity: 1, right: 0 }}
            exit={{ opacity: 0, right: "-100%" }}
          >
            <div className={style.drawer__close}>
              <button
                className={style.drawer__close__btn}
                onClick={() => setIsOpen(false)}
              >
                <HiOutlineArrowLongLeft /> <span>{title && title}</span>
              </button>
              {children}
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}

export default Drawer;
