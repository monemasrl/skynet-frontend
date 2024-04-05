import dynamic from "next/dynamic";
import { BsEmojiFrown, BsEmojiSmile, BsEmojiSunglasses } from "react-icons/bs";
import style from "./style.module.scss";
import { Error } from "../error/error";
const GaugeComponent = dynamic(() => import("react-gauge-component"), {
  ssr: false,
});

function emoji(numero: number | undefined) {
  if (numero && numero < 200)
    return (
      <span>
        <BsEmojiFrown style={{ color: "#e96666" }} />
      </span>
    );
  if (numero && numero > 200)
    return (
      <span>
        <BsEmojiSmile style={{ color: "rgb(229, 121, 75)" }} />
      </span>
    );
  if (numero && numero > 300)
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
}: {
  fusman?: number;
  text?: string;
  errorFusman?: boolean;
}) {
  if (!errorFusman) {
    return (
      <>
        <div className={style.charts__icon}>{emoji(fusman)}</div>
        <GaugeComponent
          type="semicircle"
          arc={{
            width: 0.2,
            padding: 0.005,
            subArcs: [
              {
                limit: 200,
                color: "rgb(224 54 76)",
              },
              {
                limit: 300,
                color: "rgb(229, 121, 75)",
              },
              {
                limit: 400,
                color: "rgb(69, 171, 60)",
              },
            ],
            // gradient: true,
          }}
          pointer={{
            type: "arrow",
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
              ticks: [{ value: 200 }, { value: 300 }],
            },
          }}
          minValue={0}
          maxValue={400}
          value={fusman || 0}
        />
        <div className={style.charts__title}>{text ? text : ""}</div>
      </>
    );
  }
  return <Error text="Errore caricamento dati" />;
}
export default GaugeChartWithData;
