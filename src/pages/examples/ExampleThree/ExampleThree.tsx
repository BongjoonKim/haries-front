import WritingContext from "../../../components/templates/WritingContext";
import {useRecoilState} from "recoil";
import userMenuState from "../../../hooks/users/state/UserMenuState";
import {LayoutState} from "../../../hooks/layout/LayoutState";
import {useEffect} from "react";

function ExampleThree() {
  const [a, setA] = useRecoilState(LayoutState.isAsideCollapsed);
  return (
    <>
      <WritingContext />
    </>
  )
}

export default ExampleThree;