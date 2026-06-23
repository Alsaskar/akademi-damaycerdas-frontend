import Layout from './Layout';

const Library = () => {
  const title = 'Library - Perpustakaan Digital';

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={title} />

      <Layout />
    </>
  );
}

export default Library;
