export default function FooterDashboard() {
  return (
    <div
      className="footer-dashboard text-center border-top text-muted p-2"
      style={{ borderBottom: '3px solid #764ba2', backgroundColor: '#f5f5f5' }}
    >
      <small>
        © {new Date().getFullYear()} Damay Cerdas. All rights reserved.
      </small>
    </div>
  );
}
