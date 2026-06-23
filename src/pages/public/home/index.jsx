import Layout from './Layout';

const Home = () => {
  const title = 'Akademi Damay Cerdas';

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={title} />

      <Layout />
    </>
  );
}

export default Home;
