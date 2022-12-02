const No_data = () => {
  return (
    <>
      <center>
        <i className="fa fas-warning" />
        <img src="/no_data.webp" style={{ width: "170px" }} />
        <div style={{ fontWeight: "bold" }}>Perhatian...</div>
        <div style={{ opacity: ".8" }}>Data belum tersedia</div>
      </center>
    </>
  );
};

export default No_data;
