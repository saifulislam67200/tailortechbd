import Marquee from "react-fast-marquee";
const TopBar: React.FC = () => {
  return (
    <div className="hidden w-full border-b border-border-muted bg-white py-2 lg:block">
      <div className="main_container relative mx-auto w-full overflow-hidden">
        <Marquee speed={100} pauseOnHover>
          <span className="w-fit px-4 font-bold text-primary capitalize">
            Your trusted online clothing provider!!!
          </span>
        </Marquee>
      </div>
    </div>
  );
};

export default TopBar;
