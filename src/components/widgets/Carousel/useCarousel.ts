import {MouseEventHandler, TouchEventHandler, useCallback, useEffect, useRef, useState} from "react";
import carousel from "./index";
import useDidMountEffect from "../../../utilities/useDidMountEffect";

export interface useCarouselProps {
  data : any[];
}

export default function useCarousel(props : useCarouselProps) {
  let touchStartX : number;
  let touchEndX : number;
  const [newList, setNewList] = useState<any>([]);
  const [curInx, setCurInx] = useState<number>(1);
  const ref = useRef<any>(null);
  
  // transition이 끝난후 바로 transition을 없애주면서 슬라이드를 바로 이동해주는 함수
  const swift = (inx : number) => {
    setTimeout(() => {
      setCurInx(inx);
      if (ref.current) {
        ref.current.style.transition = '';
      }
    }, 500)

  };
  
  // 이동할 방향대로 움직이게 해주는 함수
  const handleMove = useCallback((direction : number) => {
    const newInx = curInx + direction;
    if (newInx === 0) {
      setCurInx(newInx);
      swift(props.data.length);
    } else if (newInx === props.data.length + 1) {
      setCurInx(newInx)
      swift(1);
    } else {
      setCurInx(newInx);
    }
    
    if (ref.current) {
      ref.current.style.transition = "all 0.5s ease-in-out"
    }
  }, [curInx, props.data])
  
  const handleTouchStart = (event : TouchEvent) => {
    touchStartX = event.touches[0].clientX;
  }
  
  const handleTouchMove = (event : TouchEvent) => {
    const curTouchX = event.changedTouches[0].clientX;
    
    if (ref.current) {
      ref.current.style.transform = `translateX(calc(-${curInx}00% - ${(touchStartX - curTouchX) * 2 || 0}px`
    }
  }
  
  const handleTouchEnd = (event : TouchEvent) => {
    touchEndX = event.changedTouches[0].clientX;
    
    if (touchStartX >= touchEndX) {
      handleMove(1);
    } else {
      handleMove(-1)
    }
  }
  
  useEffect(() => {
    if (props.data.length) {
      const startData = props.data[0];
      const afterStartData = props.data[1];
      const endData = props.data?.slice(-1)[0];
      const beforeEndData = props.data?.slice(-2)[0];
      setNewList([beforeEndData, endData, ...props.data, startData, afterStartData])
    }
  }, [props.data]);
  // https://doooodle932.tistory.com/130
  
  useEffect(() => {
    if (ref.current !== null) {
      console.log("현재 curInx", curInx)
      if (curInx === 1) {
        ref.current.style.transform = `translateX(calc(-${544 * (curInx)}px - 448px))`
      } else if(curInx === props.data.length + 1) {
        ref.current.style.transform = `translateX(calc(-${544 * (curInx)}px - 480px))`
      } else if (curInx === 0) {
        ref.current.style.transform = `translateX(calc(-${544 * (curInx)}px - 416px))`
      } else {
        ref.current.style.transform = `translateX(calc(-${544 * (curInx)}px - 464px))`
      }
    }
  }, [curInx]);
  return {
    handleMove,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    ref,
    newList,
    curInx
  }
}