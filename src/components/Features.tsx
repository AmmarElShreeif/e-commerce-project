import { featuresItems } from "../data";
import Image from "next/image";

const Features = () => {
  return (
    <div className="bg-white shadow-md px-4 md:px-7 rounded-lg py-7">
      <div className="flex items-center justify-center flex-wrap sm:flex-nowrap gap-x-40">
        {featuresItems.map((item, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="text-3xl">
              <Image alt="feature" src={item.image} width={30} height={30} />
            </div>
            <div>
              <h4 className="font-bold text-gray-800">{item.title}</h4>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
