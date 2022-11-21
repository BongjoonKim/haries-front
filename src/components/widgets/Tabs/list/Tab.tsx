import {TabsComponent} from "../types";
import {CSSProperties} from "react";
import styled from "styled-components";
import converter from "../../../../utilities/converter";
import {RiCloseFill} from "react-icons/ri";

interface TabProps extends TabsComponent.BaseComponentProps {
    id?: string;
    label: string;
    style?:CSSProperties;
    img?: string;
}

function Tab(props: TabProps) {
    const status = props.id || props.label;
    return (
        <StyledTab
            className={converter.classNames(["tab-item", props.activeTab === status && "is-active"])}
            style={props.style}
            onClick={() => props.onActiveTab({tab: status})}
        >
            {props.img && <StyledImg src={props.img} alt={props.label} />}
            <span>{props.label}</span>
            {props.onRemoveTab && (
                <RiCloseFill
                    className="icon-close"
                    onClick={(event: React.MouseEvent<SVGElement, MouseEvent>) => {
                        if (props.onRemoveTab) props.onRemoveTab(status, event);
                    }}
                />
            )}
        </StyledTab>
    )
}

export default Tab;

const StyledTab = styled.li`
  list-style: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-grow: 1;
  max-width: 300px;
  justify-content: center;
  margin-bottom: -1px;
  border-bottom: 3px solid transparent;
  padding: 4px 15px;
  font-size: 1rem;
  color: #64696d;
  line-height: 25px;
  cursor: pointer;
  
  &.is-active {
    font-weight: 600;
    color: #363a3e;
    background-color: #fff;
    border-color: #a50034;
  }
  .icon-close {
    position: relative;
    left: 10px;
    &:hover {
      background-color: #666;
      border-radius: 50%;
      color: #fff;
      padding: 2px;
      box-sizing: border-box;
    }
  }
`;

const StyledImg = styled.img`
  width: 25px;
  height: 22px;
  margin-right: 6px;
`;