import {
  GetCountersResponse,
  GetGraphResponse,
  GraphScaleEnum,
} from "@/generated";
import { useContext, useEffect, useState } from "react";
import { context } from "../../context/context";
import Loading from "../loading/loading";
import BarChartWithData from "./barChart";
import GaugeChartWithData from "./gaugeChart";
import LineChartWithData from "./lineChart";
import SingleChart from "./singleChart";
import style from "./style.module.scss";
import { Error } from "../error/error";
import Counter from "./counter";
const datiTemporali = [
  {
    title: "Settimana",
    term: "weekly",
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

function Charts() {
  const [timeIntervalChart, setTimeIntervalChart] = useState<
    GraphScaleEnum | null | undefined
  >(GraphScaleEnum.WEEKLY);
  const [fusman, setFusman] = useState<GetCountersResponse>();
  const [datiLinea, setDatiLinea] = useState<GetGraphResponse>();
  const [errorFusman, setErrorFusman] = useState<boolean>(false);
  const [errorDatiLinea, setErrorDatiLinea] = useState<boolean>(false);
  const [loadingFusman, setLoadingFusman] = useState<boolean>(true);
  const [loadingDatiLinea, setLoadingDatiLinea] = useState<boolean>(true);
  const contextData = useContext(context);

  useEffect(() => {
    if (contextData?.apiClient) {
      contextData.apiClient.stats
        .getCounters({ pDate: null })
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
  console.log(fusman, "fusman");
  return (
    <section className={style.charts}>
      <SingleChart span={"small"}>
        {!loadingFusman ? (
          <GaugeChartWithData
            fusman={fusman?.prod_total}
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
            fusman={fusman?.prod_int}
            text="Fusman interne"
            errorFusman={errorFusman}
            limit={[100, 150, 200]}
          />
        ) : (
          <Loading />
        )}
      </SingleChart>
      <SingleChart span={"small"}>
        {!loadingFusman ? (
          <GaugeChartWithData
            fusman={fusman?.prod_ext}
            text="Fusman esterne"
            errorFusman={errorFusman}
            limit={[200, 300, 400]}
          />
        ) : (
          <Loading />
        )}
      </SingleChart>

      <SingleChart span={"small"}>
        {!loadingFusman ? (
          <Counter value={fusman?.current || 0} direction="up" />
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
            {timeIntervalChart !== GraphScaleEnum.YEARLY && (
              <LineChartWithData
                datiLinea={datiLinea}
                timeIntervalChart={timeIntervalChart || GraphScaleEnum.DAILY}
              />
            )}
            {timeIntervalChart === GraphScaleEnum.YEARLY && (
              <BarChartWithData
                datiLinea={datiLinea}
                timeIntervalChart={timeIntervalChart || GraphScaleEnum.DAILY}
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
                        setTimeIntervalChart(item.term as GraphScaleEnum);
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
      <SingleChart span={"big"}>
        {errorDatiLinea ? (
          <Error text={"Errore nel caricamento dati"} />
        ) : !loadingDatiLinea ? (
          <>
            {" "}
            {timeIntervalChart !== GraphScaleEnum.YEARLY && (
              <LineChartWithData
                datiLinea={datiLinea}
                timeIntervalChart={timeIntervalChart || GraphScaleEnum.DAILY}
              />
            )}
            {timeIntervalChart === GraphScaleEnum.YEARLY && (
              <BarChartWithData
                datiLinea={datiLinea}
                timeIntervalChart={timeIntervalChart || GraphScaleEnum.DAILY}
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
                        setTimeIntervalChart(item.term as GraphScaleEnum);
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
