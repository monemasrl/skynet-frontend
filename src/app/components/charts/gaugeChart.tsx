import dynamic from "next/dynamic";
import { BsEmojiFrown, BsEmojiSmile, BsEmojiSunglasses } from "react-icons/bs";
import style from "./style.module.scss";
import { Error } from "../error/error";

const GaugeComponent = dynamic(() => import("react-gauge-component"), {
  ssr: false,
});

function emoji(numero: number | undefined, limit: number[]) {
  if (numero != undefined && limit && numero <= limit[0])
    return (
      <span>
        <BsEmojiFrown style={{ color: "#e96666" }} />
      </span>
    );
  if (numero && limit && numero > limit[0] && numero <= limit[1])
    return (
      <span>
        <BsEmojiSmile style={{ color: "rgb(229, 121, 75)" }} />
      </span>
    );
  if (numero && limit && numero > limit[1])
    return (
      <span>
        <BsEmojiSunglasses style={{ color: "rgb(69, 171, 60)" }} />
      </span>
    );
  else return null;
}
function GaugeChartWithData({
  fusman,
  text,
  errorFusman,
  limit,
}: {
  fusman?: number;
  text?: string;
  errorFusman?: boolean;
  limit: number[];
}) {
  if (!errorFusman) {
    return (
      <>
        <div className={style.charts__icon}>{emoji(fusman, limit)}</div>
        <GaugeComponent
          type="semicircle"
          arc={{
            width: 0.2,
            padding: 0.005,
            subArcs: [
              {
                limit: limit[0],
                color: "rgb(224 54 76)",
              },
              {
                limit: limit[1],
                color: "rgb(229, 121, 75)",
              },
              {
                limit: fusman && fusman > limit[2] ? fusman : limit[2],
                color: "rgb(69, 171, 60)",
              },
            ],
            // gradient: true,
          }}
          pointer={{
            type: "blob",
            elastic: true,
            animationDelay: 0,
          }}
          labels={{
            valueLabel: {
              formatTextValue: (value) => value,
              style: {
                fill: "black",
                fontSize: "30px",
                textShadow: "2px 2px 2px transparent",
                width: "100%",
              },
            },
            tickLabels: {
              type: "inner",
              defaultTickValueConfig: {
                formatTextValue: (value) => value,
                style: {
                  fill: "black",
                },
              },
              ticks: [{ value: limit[0] }, { value: limit[1] }],
            },
          }}
          minValue={0}
          maxValue={
            fusman && fusman > limit[2]
              ? Math.ceil(fusman / 100) * 100
              : limit[2]
          }
          value={fusman || 0}
        />
        <div className={style.charts__title}>{text ? text : ""}</div>
      </>
    );
  }
  return <Error text="Errore caricamento dati" />;
}
export default GaugeChartWithData;
