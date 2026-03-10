import CousesHeader from "../components/CoursesHeader/CoursesHeader";
import LevelSelect from "../components/LevelSelect/LevelSelect";
import PriceBox from "../components/PriceBox/PriceBox";
// import CoursePage from "../components/СoursePage/CousePage";

const Courses = () => {
  return (
    <>
      <CousesHeader />
      {/* <CoursePage /> */}
      <PriceBox />
      <LevelSelect variant="white" />
    </>
  );
};
export default Courses;
