import React from "react";
import Image from "next/image";
import { SlClock, SlLocationPin } from "react-icons/sl";
import { TfiEmail } from "react-icons/tfi";
import { HiOutlinePhone } from "react-icons/hi";
const locationData = [
  {
    title: "United States",
    location: "NYC",
    image: "/locations/location1.avif",
    description: [
      {
        icon: SlLocationPin,
        text: "123 Coffee Lane, Brewtown, USA",
      },
      {
        icon: SlClock,
        text: "All week: 7:00 AM - 7:00 PM",
      },
      {
        icon: HiOutlinePhone,
        text: "+1 (555) 123-4567",
      },
      {
        icon: TfiEmail,
        text: "nyc@coffeeshop.com",
      },
    ],
  },
  {
    title: "United Arab Emirates",
    location: "Dubai",
    image: "/locations/location2.avif",
    description: [
      {
        icon: SlLocationPin,
        text: "123 Coffee Lane, Brewtown, UAE",
      },
      {
        icon: SlClock,
        text: "All week: 7:00 AM - 7:00 PM",
      },
      {
        icon: HiOutlinePhone,
        text: "+44 20 7123 4567",
      },
      {
        icon: TfiEmail,
        text: "london@coffeeshop.com",
      },
    ],
  },
  {
    title: "Japan",
    location: "Tokyo",
    image: "/locations/location3.avif",
    description: [
      {
        icon: SlLocationPin,
        text: "123 Coffee Lane, Brewtown, Japan",
      },
      {
        icon: SlClock,
        text: "All week: 7:00 AM - 7:00 PM",
      },
      {
        icon: HiOutlinePhone,
        text: "+61 2 9876 5432",
      },
      {
        icon: TfiEmail,
        text: "info@brewhaven.com",
      },
    ],
  },
];

export default function locationComponent() {
  return (
    <section className="flex w-full flex-col gap-4 rounded-[24px] bg-[#eaedf6] px-2 py-2 md:px-4 md:py-4">
      {locationData.map((location, index) => (
        <div
          key={index}
          className="flex w-full flex-col justify-between overflow-hidden rounded-[20px] bg-white xl:flex-row"
        >
          {/* Location Image */}
          <div className="flex-0 flex">
            <Image
              src={location.image}
              alt="location"
              width={700}
              height={700}
              className="h-[50vw] w-full object-cover xl:h-[612px] xl:w-[604px]"
            />
          </div>

          {/* Location Info */}
          <div className="flex flex-1 flex-col justify-between gap-10 p-[24px] md:p-[72px]">
            <div className="flex flex-col gap-4">
              {/* Location Title */}
              <div className="flex flex-col gap-1">
                <p className="text-textLight">{location.title}</p>
                <h4 className="text-[34px] font-bold leading-[40px] md:leading-[60px] tracking-[-0.04em] text-textDark md:text-[56px]">
                  {location.location}
                </h4>
              </div>
              {/* Location Description */}
              <ul className="flex flex-col gap-4 text-[14px] text-textDark md:gap-5 md:text-[16px]">
                {location.description.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <item.icon size={22} />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* View on maps button */}
            <button className="rounded-full border-[1px] border-textDark px-[20px] py-[14px] text-[16px] font-bold text-textDark transition-colors duration-300 hover:text-primary">
              View on maps
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}
