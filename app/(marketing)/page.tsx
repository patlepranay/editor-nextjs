import { Button } from "@/components/ui/button";
import Heading from "./_component/heading";
import Heroes from "./_component/heroes";
import Footer from "./_component/footer";

const MarketingPage = () => {
  return (
    <div className="min-h-screen flex flex-col dark:bg-black">
      <div className="flex flex-col items-center justify-center md:justify-start text-center  flex-1  ">
        <Heading />

        <Footer />
      </div>
    </div>
  );
};

export default MarketingPage;
