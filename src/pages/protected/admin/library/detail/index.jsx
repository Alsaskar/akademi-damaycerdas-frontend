import Layout from './Layout';

const DetailLibrary = () => {
  const title = 'Lihat Detail Document';

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={title} />

      <Layout />
    </>
  );
}

export default DetailLibrary;
