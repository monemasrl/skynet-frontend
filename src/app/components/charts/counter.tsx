import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring, motion } from "framer-motion";
import { PieChart, pieChartDefaultProps } from "react-minimal-pie-chart";
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

  const dataMock = [
    { title: "SOSPESE", value: 10, color: "#e8475c" },
    { title: "INTERNE", value: 15, color: "#7dbc77" },
    { title: "ESTERNE", value: 20, color: "#aad2a6" },
  ];
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
    <div className={style.current}>
      <div className={style.current__dato}>
        <span ref={ref} />
        <div className={style.current__dato__title}>In lavorazione</div>
      </div>

      <PieChart
        data={dataMock}
        labelPosition={60}
        lineWidth={20}
        radius={50}
        rounded
        paddingAngle={14}
        animate
        label={({ x, y, dx, dy, dataEntry }) => (
          <text
            x={x}
            y={y}
            dx={dx}
            dy={dy}
            dominant-baseline="central"
            text-anchor="middle"
            style={{
              fontSize: "6px",
              fontFamily: "sans-serif",
              fill: "#000",
            }}
          >
            <tspan x={x} y={y} dx={dx} dy={dy} style={{ fontSize: ".7rem" }}>
              {Math.round(dataEntry.percentage) + "%"}{" "}
            </tspan>
            <tspan x={x + 1} y={y + 7} dx={dx} dy={dy}>
              {dataEntry.title}
            </tspan>
          </text>
        )}
      />
      {/*   dataEntry.title + "\n" + Math.round(dataEntry.percentage) + "%"    <div className={style.charts__title}>In lavorazione</div> */}
    </div>
  );
}
