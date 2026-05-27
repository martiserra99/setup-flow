import { ItemView, type Item } from ".";

export interface Rows {
  type: "rows";
  rows: Item[];
}

export function RowsView({ rows }: Rows) {
  return (
    <div className="flex flex-col gap-3">
      {rows.map((item, i) => (
        <ItemView key={i} {...item} />
      ))}
    </div>
  );
}
