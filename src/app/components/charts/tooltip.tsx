import moment from "moment";
import style from "./style.module.scss";
const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: any;
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className={style.customTooltip}>
        <p className={style.int}>{`INT: ${payload[1].value}`}</p>
        <p className={style.ext}>{`EXT: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};
export default CustomTooltip;
