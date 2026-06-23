import Layout from './Layout';

const ManageLibrary = () => {
  const title = 'Library';

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={title} />

      <Layout />
    </>
  );
}

export default ManageLibrary;
