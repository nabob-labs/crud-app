export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="search"
      className="search-bar"
      placeholder="Search tasks..."
      value={value}
      onChange={(event) => onChange(event.target.value)}
      aria-label="Search tasks"
    />
  );
}
