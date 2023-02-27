import Navbar from "../components/headMenu/Navbar";
import MainPage from "../components/contents/MainPage/MainPage";


function IntroPage() {
    return (
        // <header>
        //     <Navbar />
        //     안녕
        //     <MainPage />
        //   <img src={`${process.env.PUBLIC_URL}/mainPage.jpeg`} width={"100px"} style={{top: 1000}}/>
        // </header>
      <img src={`${process.env.PUBLIC_URL}/mainPage.jpeg`} width={"100%"}
           style={{
               top: 0,
               left: 0,
               zIndex: 9998,
               position: "absolute"
        }}
      />

    );
}

export default IntroPage;