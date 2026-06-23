import Layout from './Layout';

const MemberProfil = () => {
  const title = 'Profil Member';

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={title} />

      <Layout />
    </>
  );
}

export default MemberProfil;
