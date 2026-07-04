"use client";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SortSelect({
  value,
  onChange,
}: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded border px-3 py-2"
    >
      <option value="updatedAt">Updated Time</option>
      <option value="title">Title</option>
      <option value="annotationCount">Annotations</option>
    </select>
  );
}