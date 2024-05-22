import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PieChart } from "react-minimal-pie-chart";
import style from "./style.module.scss";
/**
 *
 * @param root0
 * @param root0.value
 */
type tDataValue = {
  tipo: string;
  value: number;
};
export default function Counter({
  int,
  ext,
  wait,
  value,
}: {
  value: number;
  int?: number;
  ext?: number;
  wait?: number;
}) {
  function dataMock() {
    const data = [
      { title: "SOSPESE", value: wait ? wait : 0, color: "#e8475c" },
      { title: "INTERNE", value: int ? int : 0, color: "#7dbc77" },
      { title: "ESTERNE", value: ext ? ext : 0, color: "#aad2a6" },
    ];
    if (wait === 0) {
      return [
        { title: "INTERNE", value: int ? int : 0, color: "#7dbc77" },
        { title: "ESTERNE", value: ext ? ext : 0, color: "#aad2a6" },
      ];
    }
    return data;
  }
  const [dataValue, setDataValue] = useState<tDataValue | null>(null);

  return (
    <div className={style.current}>
      <div className={style.current__dato}>
        <AnimatePresence>
          {dataValue && (
            <motion.div
              className={style.current__dato__value}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <span>{dataValue.value}</span>
              <div className={style.current__dato__title}>{dataValue.tipo}</div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {!dataValue && (
            <motion.div
              className={style.current__dato__value}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <span>{value}</span>
              <div className={style.current__dato__title}>In lavorazione</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <PieChart
        data={dataMock()}
        labelPosition={70}
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
            dominantBaseline="central"
            textAnchor="middle"
            style={{
              fontSize: "4px",
              fontFamily: "sans-serif",
              fill: "#000",
            }}
            onPointerOver={(e) => {
              setDataValue({ tipo: dataEntry.title, value: dataEntry.value });
            }}
            onPointerOut={() => {
              setDataValue(null);
            }}
          >
            <tspan
              x={x}
              y={y}
              dx={dx}
              dy={dy}
              style={{ fontSize: ".6rem", fontWeight: "bold" }}
            >
              {Math.round(dataEntry.percentage) + "%"}
            </tspan>
            <tspan
              x={x}
              y={y + 7}
              dx={dx}
              dy={dy}
              style={{ fontWeight: "bold" }}
            >
              {dataEntry.title}
            </tspan>
          </text>
        )}
      />
      {/*   dataEntry.title + "\n" + Math.round(dataEntry.percentage) + "%"    <div className={style.charts__title}>In lavorazione</div> */}
    </div>
  );
}
