import { Container } from "@mui/system";
import React, { useEffect } from "react";
import { getPopularCourses } from "../api/course";
import { SliderPopular } from "./Slider";
import background from "../assets/back.jpg";
import { Link } from "@mui/material";
import { useHistory } from "react-router-dom";

export const HomePage = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [popularCourses, setPopularCourses] = React.useState([]);
  const history = useHistory();
  const fetchPopularCourses = async () => {
    try {
      const { data } = await getPopularCourses();
      setPopularCourses(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPopularCourses();
  }, []);

  const styles = {
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    width: "100vw",
    marginTop: "-20px",
  };

  return (
    <div>
      <div style={styles}>
        <span
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#d2e5df",
            textAlign: "center",
            opacity: 3,
          }}
        >
          <h1>Unlock Your Potential with Our Comprehensive Courses!</h1>
          <h4>
            Welcome to our online course platform! We are excited to offer a
            wide range of courses to help you learn new skills and advance your
            career. Our courses are designed to be flexible and self-paced, so
            you can learn at your own convenience. Whether you're looking to
            improve your computer skills, learn a new language, or earn a
            certification, we have a course that will meet your needs.{" "}
            {
              <Link
                onClick={() => history.push("/courses")}
                color={"button.main"}
                style={{ cursor: "pointer" }}
              >
                Browse our Catalog
              </Link>
            }{" "}
            and start learning today!
          </h4>
        </span>
      </div>
      <Container sx={{ textAlign: "center" }}>
        <h1>Popular Courses</h1>
        <SliderPopular courses={popularCourses} />
      </Container>
    </div>
  );
};
