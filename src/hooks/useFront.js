'use client'
import { useContext } from "react";
import FrontContext from "@/contex/FrontProvider";

const useFront = () => {
  return useContext(FrontContext)
}

export default useFront