import React, { useEffect, useState } from 'react';

const App = () => {
  /* Toàn bộ màn hình: căn giữa nội dung */
  const appcontainer = {
    display: "flex",
    "justify-content": "center",
    "align-items": "center",
    height: "100vh", /* Chiều cao toàn màn hình */
    "background-color": "#f0f0f0", /* Màu nền cho toàn trang */
    margin: "0",
  };

  /* Card: thiết kế phần khung */
  const card = {
    "text-align": "center", /* Căn giữa chữ trong card */
    "background-color": "#ffffff", /* Màu nền trắng */
    padding: "20px", /* Khoảng cách bên trong */
    border: "2px solid #cccccc", /* Viền xám */
    "border-radius": "10px", /* Góc bo tròn */
    "box-shadow": "0px 4px 6px rgba(0, 0, 0, 0.1)", /* Đổ bóng nhẹ */
    width: "300px", /* Chiều rộng card */
    height: "200px"
  }

  /* Heading: tiêu đề */
  const card_h1 = {
    "font-size": "1.5em",
    "margin-bottom": "20px", /* Khoảng cách dưới */
  }

  /* Nội dung: khoảng cách đều nhau */
  const card_p = {
    "font-size": "1.2em",
    margin: "10px 0",
    color: "#333333", /* Màu chữ xám đậm */
  }

  const [data, setData] = useState({ time: '', connections: 0 });

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:4000/sse');

    eventSource.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);
      setData(parsedData);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div style={appcontainer}>
      <div style={card}>
        <h1 style={card_h1}>WebSocket Client</h1>
        <p style={card_p}>Server Time: {data.time}</p>
        <p style={card_p}>Connections: {data.connections}</p>
      </div>
    </div>
  );
};

export default App;
