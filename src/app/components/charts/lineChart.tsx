import { GetGraphResponse } from "@/generated";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Error } from "../error/error";
import { formatXAxis } from "@/app/utility/functions";

function LineChartWithData({
  datiLinea,
  timeIntervalChart,
}: {
  datiLinea: GetGraphResponse | undefined;
  timeIntervalChart: string;
}) {
  console.log(datiLinea?.data.length, "datiLinea");
  if (datiLinea?.data && datiLinea?.data.length > 0) {
    return (
      <ResponsiveContainer>
        <AreaChart width={100} height={200} data={datiLinea.data}>
          <CartesianGrid strokeDasharray="3 3" />

          <Area
            type="monotone"
            dot={{ stroke: "#ea2e46", strokeWidth: 2 }}
            dataKey="external"
            stroke="#ea2e46"
            fill="#dedede63"
            strokeWidth={3}
            stackId="2"
          />
          <Area
            type="monotone"
            dot={{ stroke: "rgb(69, 171, 60)", strokeWidth: 2 }}
            dataKey="internal"
            stroke="rgb(69, 171, 60)"
            fill="#dedede63"
            strokeWidth={3}
            stackId="1"
          />
          <XAxis
            dataKey="date"
            fontSize={10}
            fontStyle={"color: #fff"}
            tickFormatter={(tick) => formatXAxis(tick, timeIntervalChart)}
            type={"category"}
          />
          <Tooltip />
          <Legend />
          <YAxis fontSize={10} />
        </AreaChart>
      </ResponsiveContainer>
    );
  } else {
    return <Error text={`Non ci sono dati per ${timeIntervalChart}`} />;
  }
}
export default LineChartWithData;
