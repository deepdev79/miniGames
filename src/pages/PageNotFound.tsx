import GoHome from "../components/GoHome";

function PageNotFound() {
  return (
    <div style={{ backgroundColor: "#b0adadff", height: "100vh" }}>
      <GoHome />
      <h2
        style={{
          paddingTop: "20%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "4rem",
        }}
      >
        Invalid page/path
      </h2>
    </div>
  );
}

export default PageNotFound;
