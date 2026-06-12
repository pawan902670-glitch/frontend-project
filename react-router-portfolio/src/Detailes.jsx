import { Link } from "react-router-dom";

export default function Details() {
  return (
    <div className="container">
      <h1><b>About Me</b></h1>

      <p>
        Hello! My name is <b>Pawan Kumar Yadav</b>. I am an engineering student
        and a passionate <b>Frontend Developer</b> who enjoys building clean,
        responsive, and user-friendly web applications using modern technologies.
        I am continuously improving my development skills by creating projects
        and learning new concepts in React and JavaScript.
      </p>

      <h2>My Skills</h2>
      <ul style={{ textAlign: "left", marginTop: "10px" }}>
        <li>HTML5 – Structuring modern web pages</li>
        <li>CSS3 – Styling, layouts, and responsive design</li>
        <li>JavaScript – Logic building and interactivity</li>
        <li>React JS – Component-based UI development</li>
        <li>React Router – Navigation and routing</li>
        <li>Git & GitHub – Version control and project hosting</li>
      </ul>

      <h2>College Information</h2>
      <p>
        Below are the dedicated sections for college-related information:
      </p>

      <ul style={{ textAlign: "left", marginTop: "10px" }}>
        <li>
          <Link to="/studentDetails">Student Detailes</Link>
        </li>
      </ul>

      <h2>My Goal</h2>
      <p>
        My aim is to become a professional software developer. I focus on
        writing clean code, building practical projects, and understanding
        core concepts deeply to strengthen my foundation in web development.
      </p>
    </div>
  );
}