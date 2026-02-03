export default function StatusBadge({ status }) {
  const colors = {
    Pending: "orange",
    Preparing: "blue",
    Ready: "purple",
    Delivered: "green",
    Cancelled: "red"
  };

  return (
    <span style={{ color: colors[status], fontWeight: "bold" }}>
      {status}
    </span>
  );
}