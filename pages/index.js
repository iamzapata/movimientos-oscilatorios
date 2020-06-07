import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Fisica III</title>
      </Head>

      <section className="h-screen flex items-center justify-center pb-48">
        <div className="columns w-full">
          <div className="column">
            <Link href="/movimiento-armonico-simple">
              <a className="box h-full">
                <h2 className="text-center flex items-center justify-center h-full text-xl">
                  Movimiento Armónico Simple
                </h2>
              </a>
            </Link>

            <Link href="/movimiento-sobre-amortiguado">
              <a className="box h-full">
                <h2 className="text-center flex items-center justify-center h-full text-xl">
                  Movimiento Sobre Amortiguado
                </h2>
              </a>
            </Link>
          </div>

          <div className="column">
            <Link href="/movimiento-criticamente-amortiguado">
              <a className="box h-full">
                <h2 className="text-center flex items-center justify-center h-full text-xl">
                  Movimiento Críticamente Amortiguado
                </h2>
              </a>
            </Link>

            <Link href="/movimiento-sub-amortiguado">
              <a className="box h-full">
                <h2 className="text-center flex items-center justify-center h-full text-xl">
                  Movimiento Sub Amortiguado
                </h2>
              </a>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
