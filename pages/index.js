import Head from 'next/head';
import QuestionSelector from '../components/QuestionSelector';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Q12 Question Priority Selector</title>
      </Head>
      <main>
        <h1>Gallup Q12 Priority Selector</h1>
        <QuestionSelector />
      </main>
    </div>
  );
}
