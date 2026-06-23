import Layout from './Layout';

const DashboardMember = () => {
  const title = 'Dashboard Member';

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={title} />

      <Layout />
    </>
  );
}

export default DashboardMember;
