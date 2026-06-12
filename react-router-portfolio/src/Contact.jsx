export default function Contact() {
  return (
    <div className="container">
      <h1><b>Contact Me</b></h1>

      <p>
        I’m always open to collaboration, learning opportunities, and
        interesting frontend projects. Feel free to reach out through the
        platforms below.
      </p>

      <h2>Get in Touch</h2>
      <ul style={{ textAlign: "left", lineHeight: "1.9" }}>
        <li>
          📧 Email:
          <a href="mailto:yourgmail@gmail.com"> yourgmail@gmail.com</a>
        </li>

        <li>
          💻 GitHub Repository:
          <a
            href="https://github.com/pawan902670-glitch"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            github.com/your-username
          </a>
        </li>
      </ul>

      <h2 style={{ marginTop: "25px" }}>Why Contact Me?</h2>
      <p>
        Whether you want to discuss web development, React projects, or
        collaborate on innovative ideas, I’d love to connect and contribute.
      </p>

      <div style={{ marginTop: "25px" }}>
        <a
          href="mailto:yourgmail@gmail.com"
          style={{
            padding: "10px 20px",
            background: "#2563eb",
            color: "white",
            borderRadius: "6px",
            textDecoration: "none",
            marginRight: "15px",
          }}
        >
          Send Email
        </a>

        <a
          href="https://github.com/your-username"
          target="_blank"
          rel="noreferrer"
          style={{
            padding: "10px 20px",
            background: "#0f172a",
            color: "white",
            borderRadius: "6px",
            textDecoration: "none",
          }}
        >
          Visit GitHub
        </a>
      </div>
    </div>
  );
}