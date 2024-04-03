import {TouchEventHandler, useCallback, useEffect, useRef, useState} from "react";

export interface useCarouselProps {
  data : any[];
}

export default function useCarousel(props : useCarouselProps) {
  let touchStartX : number;
  let touchEndX : number;
  const [newList, setNewList] = useState<any>([]);
  const [curInx, setCurInx] = useState<number>(0);
  const ref = useRef<any>(null);
  
  // transition이 끝난후 바로 transition을 없애주면서 슬라이드를 바로 이동해주는 함수
  const moveToFirst = useCallback((inx : number) => {
    setCurInx(inx);
    if (ref.current) {
      ref.current.style.transition = '';
    }
  }, [curInx]);
  
  // 이동할 방향대로 움직이게 해주는 함수
  const handlemove = useCallback((direction : number) => {
    const newInx = curInx + direction;
    if (newInx > props.data.length) {
      moveToFirst(1);
    } else if (newInx) {
      moveToFirst(props.data.length);
    }
    
    setCurInx((prev : number) => prev + direction);
    
    if (ref.current) {
      ref.current.style.transition = "all 0.5s ease-in-out"
    }
  }, [curInx])
  
  const handleTouchStart = (event : TouchEventHandler<HTMLDivElement>) => {
  }
  
  useEffect(() => {
    if (props.data.length) {
      const startData = props.data[0];
      const endData = props.data?.[1];
      setNewList([endData, ...props.data, startData])
    }
  }, [props.data]);
  
  useEffect(() => {
    if (ref.current) {
      ref.current.style.transform = `translateX(-${curInx}00%)`
    }
  }, [curInx]);
  return {
    
  }
}