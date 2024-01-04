import styled from "styled-components";

interface MainAdminProps {
  children : any;
}

function MainAdmin(props : MainAdminProps) {
  return (
    <StyledMainAdmin>
      <div className="left-bar">
        <div className="section">
          <div className="title">
            Blog
          </div>
          <div className="sub-title">
            Folder
          </div>
        </div>
      </div>
      <div className="main-content">
        {props.children}
      </div>
    </StyledMainAdmin>
  )
}

export default MainAdmin;

const StyledMainAdmin = styled.div`
  display: flex;
  width: 100%;

  .left-bar {
    max-width: 15rem;
    width: 10rem;
    background: #fff7e9;
    padding: 1rem 1rem;
    .section {
      .title {
        font-weight: 600;
        font-size: 20px;
        margin-bottom: 0.8rem;
      }
      .sub-title {
        margin-left: 0.6rem;
      }
    }
  }

  .main-content {
    flex-grow: 1;
  }
`;