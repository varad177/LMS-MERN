import React from "react";
import HomeLayouts from "../Layouts/homeLayouts";
import Aboutimg from "../../Assets/aboutMainImage.png";
import Apj from "../../Assets/apj.png";
import Bg from "../../Assets/billGates.png";
import Es from "../../Assets/einstein.png";
import NM from "../../Assets/nelsonMandela.png";
import SJ from "../../Assets/steveJobs.png";
import CarouselSlide from "../components/CarouselSlide";

const AboutUs = () => {
  const celebrities = [
    {
      image: Apj,
      title: "APJ Abdul Kalam",
      description:
        " Failure will never overtake me if my determination to succeed strong enough.",
      slideNo: 1,
      totalSlide: 5,
    },
    {
      image: Bg,
      title: "Bill Gates",
      description:
        " I failed in some subjects in the exam, but my friend passed in all. Now he is an engineer in Microsoft and I am the owner of Microsoft.",
      slideNo: 2,
      totalSlide: 5,
    },
    {
      image: Es,
      title: "Albert Einstein",
      description:
        " I know not with what weapons World War III will be fought, but World War IV will be fought with sticks and stones",
      slideNo: 3,
      totalSlide: 5,
    },
    {
      image: NM,
      title: "Nelson Mandela",
      description:
        " Education is the most powerful tool you can used to change the world",
      slideNo: 4,
      totalSlide: 5,
    },
    {
      image: SJ,
      title: "Steve Jobs",
      description:
        "  Don't let the noise of others' opinions drown out your own inner voice.",
      slideNo: 5,
      totalSlide: 5,
    },
  ];
  return (
    <HomeLayouts>
      <div className=" pt-20 flex flex-col text-white md:pl-20">
      <h1 className="text-3xl text-center text-yellow-500 font-semibold md:text-5xl ">
            Affordable and quality education
          </h1>
        <div className="flex  flex-col-reverse gap-5 mx-6 items-center md:mx-10 md:flex-row">
          
          <section className="w-[93%] space-y-10 md:w-[50%]">
            <p className="text-xl text-center">
              our goal is to provide the affordable and quality education to the
              world. we are providing the platform for the aspiring teacher and
              the student. too share their skill, craativity and knowledge to
              eachh otherto empower and contribute in the growth and wellness of
              manking
            </p>
          </section>

          <div className="w-[80%] flex justify-center items-center md:w-1/2 ">
            <img
              id="text1"
              className="drop-shadow-2xl"
              style={{
                filter: "drop-shadow(0px 10px 10px rgb(0,0,0))",
              }}
              src={Aboutimg}
              alt="about imag"
            />
          </div>
        </div>

        {/* crouset */}
        <div className="carousel w-[95%] my-16 m-auto md:w-1/2">
          {celebrities &&
            celebrities.map((celebInfo) => (
              <CarouselSlide
                slideNo={celebInfo.slideNo}
                {...celebInfo}
                key={celebInfo.slideNo}
              />
            ))}
        </div>
      </div>
    </HomeLayouts>
  );
};

export default AboutUs;
