import Head from 'next/head';
import clsx from 'clsx';
import {Inter} from 'next/font/google';
import classes from '@styles/Home.module.scss';

const inter = Inter({subsets: ['latin']});

export default function Home() {
  return (
    <>
      <Head>
        <title>Field Builder UI</title>
        <meta
          name="description"
          content="Field builder with user friendly UI"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={clsx(inter.className, classes.main)}>
        <h1>Field Builder UI</h1>
      </main>
    </>
  );
}
