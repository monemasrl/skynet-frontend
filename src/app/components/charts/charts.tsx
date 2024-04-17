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
import SingleChart from "./singleChart";
import style from "./style.module.scss";
import { Error } from "../error/error";
import Counter from "./counter";
import { VscRefresh } from "react-icons/vsc";
import Link from "next/link";
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
  const [timeIntervalChartProduction, setTimeIntervalChartProduction] =
    useState<GraphScaleEnum | null | undefined>(GraphScaleEnum.WEEKLY);
  const [fusman, setFusman] = useState<GetCountersResponse>();
  const [datiLinea, setDatiLinea] = useState<GetGraphResponse>();
  const [datiLineaProduction, setDatiLineaProduction] =
    useState<GetGraphResponse>();
  const [errorFusman, setErrorFusman] = useState<boolean>(false);
  const [errorDatiLinea, setErrorDatiLinea] = useState<boolean>(false);
  const [errorDatiLineaProduction, setErrorDatiLineaProduction] =
    useState<boolean>(false);
  const [loadingFusman, setLoadingFusman] = useState<boolean>(true);
  const [loadingDatiLinea, setLoadingDatiLinea] = useState<boolean>(true);
  const [loadingDatiLineaProduction, setLoadingDatiLineaProduction] =
    useState<boolean>(true);
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

  useEffect(() => {
    if (contextData?.apiClient) {
      contextData.apiClient.stats
        .getProduction({ type: timeIntervalChartProduction })
        .then((data) => {
          setLoadingDatiLineaProduction(false);
          setDatiLineaProduction(data);
        })
        .catch((err) => {
          console.log(err);
          setErrorDatiLinea(true);
        });
    }
  }, [contextData?.apiClient, timeIntervalChartProduction]);
  console.log(fusman, "fusman");
  return (
    <section className={style.charts}>
      <div className={style.refreshData}>
        <Link
          className={"btn-generic"}
          style={{
            fontSize: ".9rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
          }}
          href={"/"}
        >
          <VscRefresh style={{ fontSize: "1.3rem" }} />
          <span>Refresh</span>
        </Link>
      </div>
      <SingleChart span={"small"}>
        {!loadingFusman ? (
          <GaugeChartWithData
            fusman={fusman?.sales}
            text="Ordini"
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
            fusman={fusman?.prod_total}
            text="Fusman Totali"
            errorFusman={errorFusman}
            limit={[100, 200, 300]}
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
            limit={[100, 150, 200]}
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
            {timeIntervalChart === GraphScaleEnum.WEEKLY && (
              <BarChartWithData
                datiLinea={datiLinea}
                timeIntervalChart={timeIntervalChart || GraphScaleEnum.WEEKLY}
              />
            )}
            {timeIntervalChart === GraphScaleEnum.MONTHLY && (
              <BarChartWithData
                datiLinea={datiLinea}
                timeIntervalChart={timeIntervalChart || GraphScaleEnum.MONTHLY}
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
                <div className={style.title}>Ordini: </div>
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
        {errorDatiLineaProduction ? (
          <Error text={"Errore nel caricamento dati"} />
        ) : !loadingDatiLineaProduction ? (
          <>
            {" "}
            {timeIntervalChartProduction === GraphScaleEnum.WEEKLY && (
              <BarChartWithData
                datiLinea={datiLineaProduction}
                timeIntervalChart={
                  timeIntervalChartProduction || GraphScaleEnum.WEEKLY
                }
              />
            )}
            {timeIntervalChartProduction === GraphScaleEnum.MONTHLY && (
              <BarChartWithData
                datiLinea={datiLineaProduction}
                timeIntervalChart={
                  timeIntervalChartProduction || GraphScaleEnum.MONTHLY
                }
              />
            )}
            {timeIntervalChartProduction === GraphScaleEnum.YEARLY && (
              <BarChartWithData
                datiLinea={datiLineaProduction}
                timeIntervalChart={
                  timeIntervalChartProduction || GraphScaleEnum.DAILY
                }
              />
            )}
            <div className={style.charts__title}>
              <div className={style.charts__title__tipoDati}>
                <div className={style.title}>Produzione: </div>
                {datiTemporali.map((item) => {
                  return (
                    <span
                      key={item.title}
                      onClick={() => {
                        setTimeIntervalChartProduction(
                          item.term as GraphScaleEnum
                        );
                      }}
                      style={{
                        borderBottom: `${
                          item.term === timeIntervalChartProduction
                            ? "2px solid"
                            : ""
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
