import MenuItem from '../MenuItem';

const MemberMenu = () => {
  return (
    <div className="menus">
      <MenuItem
        label="Dashboard"
        href="/member/dashboard"
        icon={<i className="bi bi-columns-gap"></i>}
      />
      <MenuItem
        label="Training Saya"
        href="/member/training-own"
        icon={<i className="bi bi-journal-richtext"></i>}
      />
      <MenuItem
        label="Library"
        href="/member/library"
        icon={<i className="bi bi-journal-bookmark-fill"></i>}
      />
      <MenuItem
        label="Profil"
        href="/member/profile"
        icon={<i className="bi bi-person-fill"></i>}
      />
      <MenuItem
        label="Ganti Password"
        href="/member/change-password"
        icon={<i className="bi bi-gear-fill"></i>}
      />
    </div>
  );
}

export default MemberMenu