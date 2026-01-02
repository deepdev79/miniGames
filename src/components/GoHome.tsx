import { useNavigate } from "react-router-dom";
function GoHome() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <div style={{ position: "fixed", top: 12, right: 12, zIndex: 1000 }}>
      <button
        onClick={goHome}
        aria-label="Go to homepage"
        style={{
          padding: "8px 12px",
          fontSize: "14px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          background: "#fff",
          cursor: "pointer",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        Home
      </button>
    </div>
  );
}

export default GoHome;
