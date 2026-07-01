/**
 * Search bar
 *
 * Controlled input; onChange triggers parent filtering in real time.
 * Filter logic (case-insensitive title substring) is implemented in TaskList.
 */
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
