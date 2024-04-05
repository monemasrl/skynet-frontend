import style from "./style.module.scss";

function SingleChart({
  children,
  span,
}: {
  children: React.ReactNode;
  span: string;
}) {
  return (
    <div className={`${style.singleChart} ${style["span" + "_" + span]}`}>
      {children}
    </div>
  );
}
export default SingleChart;
