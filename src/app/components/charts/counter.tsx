import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring, motion } from "framer-motion";
import style from "./style.module.scss";
/**
 *
 * @param root0
 * @param root0.value
 */
export default function Counter({
  value,
  direction = "up",
}: {
  value: number;
  direction?: "up" | "down";
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(
    direction === "down" ? value : value / 1.05
  );
  const springValue = useSpring(motionValue, {
    damping: 10,
    stiffness: 10,
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(direction === "down" ? 0 : value);
    }
  }, [motionValue, isInView]);

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current) {
          ref.current.textContent = Intl.NumberFormat("en-US").format(
            latest.toFixed(0)
          );
        }
      }),
    [springValue]
  );
  return (
    <motion.div
      className={style.current}
      initial={{ opacity: 0, width: 0, height: 0 }}
      animate={{ opacity: 1, width: 188, height: 188 }}
      transition={{ duration: 0.5 }}
    >
      <div className={style.current__dato}>
        <span ref={ref} />
      </div>
      <div className={style.charts__title}>In lavorazione</div>
    </motion.div>
  );
}
