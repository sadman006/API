import React from "react";
import Image from "next/image";
import Link from "next/link";
const ImageBanners = ({
  imgPath,
  title,
  subtitle,
  isTestDrivePg,
  brochure,
  titleClass = "",
  height = "h-[500px]",
}) => {
  return (
    <>
      <div className=" relative before:absolute before:inset-0 before:bg-black before:opacity-30">
        <Image
          src={imgPath}
          alt="Banner"
          width={800}
          height={800}
          className={`w-full object-cover ${height}`}
        />
        <div className={`w-full absolute bottom-0`}>
          <div className="px-20 flex flex-col lg:flex-row justify-between mb-8 lg:mb-16">
            {/* text */}
            <div className="flex flex-col justify-end">
              <p
                className={`lg:text-5xl md:text-4xl text-gray-100 text-2xl uppercase ${titleClass}`}
              >
                {title}
              </p>
              <div
                className={`${subtitle == "null" ? "hidden" : "flex space-x-10 mt-2"}`}
              >
                <p className="text-sm text-gray-100">{subtitle}</p>
              </div>
            </div>
            {/* button */}
            <div className="flex flex-col md:flex-row md:gap-5">
              {/* {brochure?.data && (
                <Link href={brochure?.data.attributes.url} target="_blank">
                  <div className="flex mt-6 items-center">
                    <button className="custom-button underline bg-white transition-colors text-black hover:bg-black hover:text-white">
                      Brochure
                    </button>
                  </div>
                </Link>
              )} */}
              {!isTestDrivePg && (
                <Link href={`/book-test-drive`}>
                  <div className="flex   mt-6 items-center">
                    <button className="px-3 py-3 bg-red-500 text-white font-extrabold cursor-pointer transition-colors hover:bg-white hover:text-red-500 hover:border hover:border-red-500">
                      BOOK A TEST DRIVE
                    </button>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageBanners;
