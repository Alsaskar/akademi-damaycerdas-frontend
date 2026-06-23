import MenuItem from '../MenuItem';
import Submenu from '../SubMenu';

export default function AdminMenu() {
  return (
    <div className="menus">
      <MenuItem
        label="Dashboard"
        href="/admin/dashboard"
        icon={<i className="bi bi-speedometer2"></i>}
      />

      <MenuItem
        label="Training"
        href="/admin/training"
        icon={<i className="bi bi-journal-richtext"></i>}
      />

      <MenuItem
        label="Member"
        href="/admin/member"
        icon={<i className="bi bi-people-fill"></i>}
      />

      <Submenu
        label="Library"
        id="library-submenu"
        icon={<i className="bi bi-journal-bookmark-fill"></i>}
        submenuName={[
          `admin/library`,
          `admin/library-categories`
        ]}
      >
        <MenuItem
          label="Data Dokumen"
          href={`/admin/library`}
          icon={<i className="bi bi-file-earmark-text-fill"></i>}
        />

        <MenuItem
          label="Kategori"
          href={`/admin/library-categories`}
          icon={<i className="bi bi-tags-fill"></i>}
        />
      </Submenu>

      {/* <MenuItem
        label="Laporan"
        href="/admin/laporan"
        icon={<i className="bi bi-bar-chart-fill"></i>}
      />

      <MenuItem
        label="Pengaturan"
        href="/admin/pengaturan"
        icon={<i className="bi bi-gear-fill"></i>}
      /> */}
    </div>
  );
}