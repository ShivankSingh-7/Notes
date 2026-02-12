import React from "react";
import HeroImg from "../../assets/HeroImg.png";
import PrimaryButton from "../PrimaryButton/PrimaryButton";

function Hero() {
  return (
    <div className="p-3 m-2 ">
      <div className=" flex flex-col-reverse lg:flex-row justify-between">
        <div className="flex  items-center">
          <div className="">
            <div className="py-5">
              <h1 className="text-4xl">
                Make{" "}
                <span className="text-cyan-600 font-medium text-6xl">Note</span>
                -Taking Effortless <br />
                Organize Your Ideas with Ease
              </h1>
              <p className="text-gray-600 text-lg mt-4 max-w-2xl">
                Capture your thoughts instantly, manage tasks efficiently, and
                keep everything organized in one beautiful and simple workspace
                designed for productivity.
              </p>
            </div>

            <div className="flex justify-center items-center">
              <PrimaryButton text={"Get Started"} />
            </div>
          </div>
        </div>

        <div className="lg:w-1/2">
          <img src={HeroImg} alt="NoteImage" />
        </div>
      </div>
    </div>
  );
}

export default Hero;
