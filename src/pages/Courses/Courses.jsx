import CousesHeader from "../../components/CoursesHeader/CoursesHeader";
import LevelSelect from "../../components/LevelSelect/LevelSelect";
import CoursePage from "../../components/СoursePage/CousePage";

const Courses = () => {
  return (
    <>
      <CousesHeader />
      <CoursePage />
      <LevelSelect variant="white" />
    </>
  );
};
export default Courses;
