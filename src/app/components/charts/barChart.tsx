import { GetGraphResponse } from "@/generated";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Error } from "../error/error";
import { formatXAxis } from "@/app/utility/functions";
import CustomTooltip from "./tooltip";

function BarChartWithData({
  datiLinea,
  timeIntervalChart,
}: {
  datiLinea: GetGraphResponse | undefined;
  timeIntervalChart: string;
}) {
  console.log(datiLinea, "datiLinea");
  if (datiLinea?.data?.length && datiLinea.data.length > 0) {
    return (
      <ResponsiveContainer>
        <BarChart width={100} height={200} data={datiLinea.data}>
          <Tooltip content={<CustomTooltip />} />
          <CartesianGrid strokeDasharray="3 3" />

          <Bar dataKey="external" fill="#ea2e46" stackId="1" />
          <Bar dataKey="internal" fill="#82ca9d" stackId="1" />

          <XAxis
            dataKey="date"
            fontSize={10}
            fontStyle={"color: #fff"}
            tickFormatter={(tick) => formatXAxis(tick, timeIntervalChart)}
            type={"category"}
          />

          <YAxis fontSize={10} />

          <Legend />
        </BarChart>
      </ResponsiveContainer>
    );
  } else {
    return <Error text="non ci sono dati per anno" />;
  }
}
export default BarChartWithData;
