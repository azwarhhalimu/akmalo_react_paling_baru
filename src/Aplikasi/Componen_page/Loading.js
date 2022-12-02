const Loading = () => {
  return (
    <div style={{ background: "#F34900", padding: "10px", color: "white", width: "230px", borderRadius: "5px", position: "fixed", bottom: "10px", left: "10px", zIndex: "1090" }}>
      <table width={"100%"}>
        <tr>
          <td>
            <img style={{ width: "40px" }} src="/loading.gif" />
          </td>
          <td width="20"> </td>
          <td>
            <b>Harap tunggu</b>
            <br />
            <span style={{ opacity: "0.7" }}>Mengirim Pesan....</span>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default Loading;
