"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
function MainError() {
  const router = useRouter();
  return (
    <div className="error">
      <Image
        src="images/error.svg"
        width={50}
        height={50}
        alt="loading image"
      />
      <div>ERRORE NEL CARICAMENTO DEI DATI</div>
      <div>
        <a href="/">Riprova</a>
      </div>
      <div>
        <a className="error__contattaci" href="mailto:">
          Contattaci
        </a>
      </div>
    </div>
  );
}
function Error({ text }: { text?: string | undefined }) {
  const router = useRouter();
  return (
    <div className="generic-error">
      <div className="imageError">
        <Image src="images/cloud.svg" fill={true} alt="loading image" />
      </div>
      <div>{text || "PROBLEMA NEL CARICAMENTO DEI DATI"}</div>
      <div>
        <Link href="/">Riprova</Link>
      </div>
    </div>
  );
}
export { MainError, Error };
