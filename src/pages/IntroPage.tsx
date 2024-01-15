import MainPage from "../components/contents/MainPage/MainPage";
import styled from "styled-components";
import {useTransition} from "react-spring";
import {NavigatorItemProps} from "../containers/global/Header/Navigator/list/types";
import InstagramIcon from '@mui/icons-material/Instagram';
import { Link } from '@mui/material';



function IntroPage() {
  return (
    <StyleIntroPage >
      <div
        className="main-box"
      >
        <div
          className="middle"
        >
          <img
            className="home-image"
            src={`${process.env.PUBLIC_URL}/home-image.JPG`}
            width={"20rem"}
          />
          <div className="border-box">
            Haries Home
          </div>
        </div>
      </div>
      <div
        className="wrapper-box"
      >
        <div className="box-left">
          <div className="contents">
            <div
              className="title"
            >
              Introducing Blog
            </div>
            <div className='description'>
              <span>
                Welcome visiting my blog!
                I study what is necessary for web development and leave the results of my studies on a blog. The results can be left in writing or developed on this blog. Before I introduce the results of my studies, who am I?
              </span>
            </div>
          </div>
          <div
            className="image-cover"
          >
            <img
              className="intro-image"
              src={`${process.env.PUBLIC_URL}/IMG_0672.JPG`}
              width={"100%"}
            />
          </div>
        </div>
      </div>
      <div
        className="wrapper-box"
      >
        <div className="box-right">
          <div
            className="image-cover"
          >
            <img
              className="intro-image"
              src={`${process.env.PUBLIC_URL}/IMG_3040.JPG`}
              width={"100%"}
            />
          </div>
          <div className="contents">
            <div className="title">Who am I</div>
            <div className='description'>
              <span>Going on a trip somewhere, experiencing a new place, and meeting new people makes me happy</span>
            </div>
          </div>
        </div>
      </div>
      <div className='separator' />
      <div
        className="middle-box"
      >
        <div className="box">
          <div className="contents">
            <div className="title">What I can do</div>
            <div className="tech-list">
              <img
                src={`${process.env.PUBLIC_URL}/react.png`}
              />
              <img
                src={`${process.env.PUBLIC_URL}/typescript.png`}
              />
              <img
                src={`${process.env.PUBLIC_URL}/spring.png`}
              />
              <img
                src={`${process.env.PUBLIC_URL}/mongodb.png`}
              />
              <img
                src={`${process.env.PUBLIC_URL}/elasticsearch.png`}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className="bottom-box"
      >
        <div className='left'>
          <div className="title">
            email
          </div>
          <div className="contents">
            bongjoonkim96@gmail.com
          </div>
        </div>
        <div className="right">
          <Link
            href={"https://www.instagram.com/haries_sh/"}
          >
            <InstagramIcon
              fontSize="large"
            />
          </Link>
          
        </div>
      </div>
    
    </StyleIntroPage>
  );
}

export default IntroPage;

const StyleIntroPage = styled.div`
  z-index: 9998;
  overflow: hidden;
  width: 100%;
  background: #FFEEDF;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 1199px) {
    .middle {
      display: flex;
      width: 80%;
      height: 80%;
    }
    .main-box {
      display: flex;
      flex-grow: 1;
      height: 50vh;
      background: rgb(232 206 183);
      justify-content: center;
      align-items: center;
      .home-image {
        width : 40%;
        height: 40%;
        position: absolute;
        border-radius: 1rem 1rem;
      }
      .border-box {
        position: absolute;
        border: 5px solid white;
        width : calc(60% - 2rem);
        height: 10rem;
        z-index: 20;
        left: 30%;
        top : 15%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        font-size: 3rem;
        padding-right: 2rem;
      }
    }
    //.separator {
    //  width: 100%;
    //  border: 1px solid black;
    //}
    .wrapper-box {
      //position: absolute;
      display: flex;
      justify-content: center;
      &:nth-child(2) {
        border-bottom: 1px solid black;
      }
      .box-left {
        border-left: 1px solid black;
        margin: 0rem 3rem;
        display: flex;
        width : 80%;
        justify-content: space-between;
        .contents {
          width: 100%;
          margin: 3rem 3rem;
          display: flex;
          flex-direction: column;
          .title {          // 제목
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 1rem;
          }
          .description {
            margin-left: 1rem;
            padding: 0 1rem;
            flex-grow: 1;
            span {
              font-size: 1.2rem;
            }
          }
        }
        .image-cover {
          margin: 3rem;
          img {
            width: 250px;
            height: 250px;
            object-fit: cover;
            float: right;
          }
        }
      }
      .box-right {
        margin: 0rem 3rem;
        display: flex;
        width : 80%;
        justify-content: space-between;
        border-right: 1px solid black;
        .contents {
          width: 100%;
          margin: 3rem 3rem;
          display: flex;
          flex-direction: column;
          .title {          // 제목
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 1rem;
          }
          .description {
            margin-left: 1rem;
            padding: 0 1rem;
            flex-grow: 1;
            span {
              font-size: 1.2rem;
            }
          }
        }
        .image-cover {
          margin: 3rem;
          img {
            width: 250px;
            height: 250px;
            object-fit: cover;
            float: right;
          }
        }
      }
    }
    .middle-box {
      display: flex;
      justify-content: center;
      background: #CCAF95;
      .box {
        margin: 0rem 3rem;
        display: flex;
        width : 80%;
        justify-content: space-between;
        .contents {
          display: flex;
          flex-direction: column;
          width: 100%;
          margin: 3rem 3rem;
          .title { // 제목
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 1rem;
            display: flex;
            justify-content: center;
          }
          .tech-list {
            display: flex;
            justify-content: center;
            img {
              margin: 1rem 1rem;
              height: 4rem;
              object-fit: contain;
              border-radius: 1rem;
            }
          }
          span {
            font-size: 1.2rem;
          }
        }
      }
    }
    .bottom-box {
      display: flex;
      justify-content: space-between;
      height: 6rem;
      background: black;
      color: snow;
      padding: 2rem 2rem;
      align-items: center;
      svg {
        fill: snow;
      }
      .title {
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 1rem;
      }
    }
  }



  @media only screen and (min-width: 1200px) {
    .middle {
      display: flex;
      width: 60rem;
      height: 80%;
    }
    .main-box {
      display: flex;
      flex-grow: 1;
      height: 50vh;
      background: rgb(232 206 183);
      justify-content: center;
      align-items: center;
      .home-image {
        width : 472px;
        height: 40%;
        position: absolute;
        border-radius: 1rem 1rem;
      }
      .border-box {
        position: relative;
        border: 5px solid white;
        width : 678px;
        height: 10rem;
        z-index: 20;
        left: 235px;
        top : 80px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        font-size: 3rem;
        padding-right: 2rem;
      }
    }
    //.separator {
    //  width: 100%;
    //  border: 1px solid black;
    //}
    .wrapper-box {
      //position: absolute;
      display: flex;
      justify-content: center;
      &:nth-child(2) {
        border-bottom: 1px solid black;
      }
      .box-left {
        border-left: 1px solid black;
        margin: 0rem 3rem;
        display: flex;
        width : 60rem;
        justify-content: space-between;
        .contents {
          width: 100%;
          margin: 3rem 3rem;
          display: flex;
          flex-direction: column;
          .title {          // 제목
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 1rem;
          }
          .description {
            margin-left: 1rem;
            padding: 0 1rem;
            flex-grow: 1;
            span {
              font-size: 1.2rem;
            }
          }
        }
        .image-cover {
          margin: 3rem;
          img {
            width: 250px;
            height: 250px;
            object-fit: cover;
            float: right;
          }
        }
      }
      .box-right {
        margin: 0rem 3rem;
        display: flex;
        width : 60rem;
        justify-content: space-between;
        border-right: 1px solid black;
        .contents {
          width: 100%;
          margin: 3rem 3rem;
          display: flex;
          flex-direction: column;
          .title {          // 제목
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 1rem;
          }
          .description {
            margin-left: 1rem;
            padding: 0 1rem;
            flex-grow: 1;
            span {
              font-size: 1.2rem;
            }
          }
        }
        .image-cover {
          margin: 3rem;
          img {
            width: 250px;
            height: 250px;
            object-fit: cover;
            float: right;
          }
        }
      }
    }
    .middle-box {
      display: flex;
      justify-content: center;
      background: #CCAF95;
      .box {
        margin: 0rem 3rem;
        display: flex;
        width : 80%;
        justify-content: space-between;
        .contents {
          display: flex;
          flex-direction: column;
          width: 100%;
          margin: 3rem 3rem;
          .title { // 제목
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 1rem;
            display: flex;
            justify-content: center;
          }
          .tech-list {
            display: flex;
            justify-content: center;
            img {
              margin: 1rem 1rem;
              height: 4rem;
              object-fit: contain;
              border-radius: 1rem;
            }
          }
          span {
            font-size: 1.2rem;
          }
        }
      }
    }
    .bottom-box {
      display: flex;
      justify-content: space-between;
      height: 6rem;
      background: black;
      color: snow;
      padding: 2rem 2rem;
      align-items: center;
      svg {
        fill: snow;
      }
      .title {
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 1rem;
      }
    }
  }
  
`;