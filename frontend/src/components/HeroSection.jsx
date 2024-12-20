import video1 from "../assets/video1.mp4";
import video2 from "../assets/video2.mp4";

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center mt-6 lg:mt-20">
      <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
        Host, Connect, Celebrate :
        <span className="bg-gradient-to-r from-purple-500 to-purple-800 text-transparent bg-clip-text">
          {" "}
          Your Events, Our Platform!
        </span>
      </h1>
      <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
        Effortlessly manage your events from start to finish with our all-in-one platform. Simplify, organize, and elevate every experience with ease!
      </p>
      <div className="flex justify-center my-10">
        <a
          href="/categories"
          className="bg-gradient-to-r from-purple-300 to-purple-500 border border-black py-3 px-4 mx-3 rounded-md"
        >
          Explore Now
        </a>
      </div>
      <div className="flex mt-10 justify-center">
        <video
          autoPlay
          loop
          muted
          className="rounded-lg w-1/2 border border-purple-700 shadow-sm shadow-purple-400 mx-2 my-4"
        >
          <source src={video1} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <video
          autoPlay
          loop
          muted
          className="rounded-lg w-1/2 border border-purple-700 shadow-sm shadow-purple-400 mx-2 my-4"
        >
          <source src={video2} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default HeroSection;
