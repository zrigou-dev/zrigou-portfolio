// A template (unlike a layout) remounts on every navigation, so each page fades in instead of snapping.
// Opacity only: transforms or filters here would turn the fixed header into a child of this wrapper.
export default function Template({ children }) {
  return <div className="page-enter">{children}</div>;
}
