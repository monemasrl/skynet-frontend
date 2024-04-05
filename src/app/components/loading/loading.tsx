import Image from "next/image";
function Loading() {
  return (
    <div className="loading">
      <Image
        src="images/loading.svg"
        width={50}
        height={50}
        alt="loading image"
      />
      <div>Loading...</div>
    </div>
  );
}
export default Loading;
