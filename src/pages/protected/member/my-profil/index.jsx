import Layout from './Layout';

const MyProfil = () => {
  const title = 'Profil';

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={title} />

      <Layout />
    </>
  );
}

export default MyProfil;
