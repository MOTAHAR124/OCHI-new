export default function RoundedSection({
  as: Component = "section",
  className = "",
  children,
  ...props
}) {
  const classes = `rounded-section relative ${className}`.trim();
  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}

