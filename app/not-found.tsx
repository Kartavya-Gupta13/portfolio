export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <h1
        style={{ fontWeight: 800, fontSize: "4rem", letterSpacing: "-0.05em" }}
      >
        404
      </h1>
      <a href="/" style={{ textDecoration: "underline", color: "inherit" }}>
        go home
      </a>
    </div>
  );
}
