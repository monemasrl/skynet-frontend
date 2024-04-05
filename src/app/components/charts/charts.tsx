import {
  GetFusmanResponse,
  GetSalesResponse,
  SalesTypeEnum,
} from "@/generated";
import { useContext, useEffect, useState } from "react";
import { BsEmojiFrown, BsEmojiSmile, BsEmojiSunglasses } from "react-icons/bs";
import { context } from "../../context/context";
import Loading from "../loading/loading";
import BarChartWithData from "./barChart";
import GaugeChartWithData from "./gaugeChart";
import LineChartWithData from "./lineChart";
import SingleChart from "./singleChart";
import style from "./style.module.scss";
import { Error } from "../error/error";
const datiTemporali = [
  {
    title: "24H",
    term: "daily",
  },
  {
    title: "Mese",
    term: "monthly",
  },
  {
    title: "Anno",
    term: "yearly",
  },
];

function emoji(numero: number) {
  if (numero < 100)
    return (
      <span>
        <BsEmojiFrown style={{ color: "#e96666" }} />
      </span>
    );
  if (numero < 200)
    return (
      <span>
        <BsEmojiSmile style={{ color: "rgb(229, 121, 75)" }} />
      </span>
    );
  if (numero < 300)
    return (
      <span>
        <BsEmojiSunglasses style={{ color: "rgb(69, 171, 60)" }} />
      </span>
    );
}

function Charts() {
  const [timeIntervalChart, setTimeIntervalChart] = useState<
    SalesTypeEnum | null | undefined
  >(SalesTypeEnum.DAILY);
  const [fusman, setFusman] = useState<GetFusmanResponse>();
  const [datiLinea, setDatiLinea] = useState<GetSalesResponse>();
  const [errorFusman, setErrorFusman] = useState<boolean>(false);
  const [errorDatiLinea, setErrorDatiLinea] = useState<boolean>(false);
  const [loadingFusman, setLoadingFusman] = useState<boolean>(true);
  const [loadingDatiLinea, setLoadingDatiLinea] = useState<boolean>(true);
  const contextData = useContext(context);

  useEffect(() => {
    if (contextData?.apiClient) {
      contextData.apiClient.stats
        .getFusmans({ date: null })
        .then((data) => {
          setFusman(data);
          setLoadingFusman(false);
        })
        .catch((err) => {
          console.log(err);
          setErrorFusman(true);
        });
    }
  }, [contextData?.apiClient]);

  useEffect(() => {
    if (contextData?.apiClient) {
      contextData.apiClient.stats
        .getSales({ type: timeIntervalChart })
        .then((data) => {
          setLoadingDatiLinea(false);
          setDatiLinea(data);
        })
        .catch((err) => {
          console.log(err);
          setErrorDatiLinea(true);
        });
    }
  }, [contextData?.apiClient, timeIntervalChart]);

  return (
    <section className={style.charts}>
      <SingleChart span={"small"}>
        {!loadingFusman ? (
          <GaugeChartWithData
            fusman={fusman?.total}
            text="Fusman totali"
            errorFusman={errorFusman}
            limit={[200, 300, 400]}
          />
        ) : (
          <Loading />
        )}
      </SingleChart>

      <SingleChart span={"small"}>
        {!loadingFusman ? (
          <GaugeChartWithData
            fusman={fusman?.external}
            text="Fusman esterne"
            errorFusman={errorFusman}
            limit={[100, 150, 200]}
          />
        ) : (
          <Loading />
        )}
      </SingleChart>

      <SingleChart span={"big"}>
        {errorDatiLinea ? (
          <Error text={"Errore nel caricamento dati"} />
        ) : !loadingDatiLinea ? (
          <>
            {" "}
            {timeIntervalChart !== SalesTypeEnum.YEARLY && (
              <LineChartWithData
                datiLinea={datiLinea}
                timeIntervalChart={timeIntervalChart || SalesTypeEnum.DAILY}
              />
            )}
            {timeIntervalChart === SalesTypeEnum.YEARLY && (
              <BarChartWithData
                datiLinea={datiLinea}
                timeIntervalChart={timeIntervalChart || SalesTypeEnum.DAILY}
              />
            )}
            <div className={style.charts__title}>
              <div className={style.charts__title__tipoDati}>
                <div className={style.title}>Volume di vendite: </div>
                {datiTemporali.map((item) => {
                  return (
                    <span
                      key={item.title}
                      onClick={() => {
                        setTimeIntervalChart(item.term as SalesTypeEnum);
                      }}
                      style={{
                        borderBottom: `${
                          item.term === timeIntervalChart ? "2px solid" : ""
                        }`,
                      }}
                    >
                      {item.title}
                    </span>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <Loading />
        )}
      </SingleChart>
    </section>
  );
}
export default Charts;
