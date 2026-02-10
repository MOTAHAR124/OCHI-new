export default function SiteAwardBadge() {
  return (
    <a
      href="https://www.awwwards.com"
      target="_blank"
      rel="noreferrer"
      className="site-award-badge hidden md:flex"
      aria-label="Site of the Day"
    >
      <span className="site-award-badge__mark">w.</span>
      <span className="site-award-badge__label">Site of the Day</span>
    </a>
  );
}
