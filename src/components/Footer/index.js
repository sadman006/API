import Image from "next/image";

export default function Footer() {
  return (
    <div className="custom-container flex flex-wrap gap-12 bg-[#E9E6F4] py-16">
      {/* Logo */}
      <div className="order-1 shrink-0 w-full sm:w-[45%] xl:w-[15%] flex sm:items-center xl:items-start justify-center sm:justify-start">
        <Image
          src="/Group.png"
          alt="logo"
          height={150}
          width={150}
          className="w-auto h-auto"
        />
      </div>

      {/* Quick Links */}
      <div className="order-3 w-full sm:w-[45%] xl:w-[15%] space-y-4">
        <h1 className="text-[#222E48] font-medium text-[28px]">Quick Links</h1>

        <p className="text-[#7F8490] text-[16px] font-normal">About Us</p>

        <p className="text-[#7F8490] text-[16px] font-normal">Our Vision</p>

        <p className="text-[#7F8490] text-[16px] font-normal">Pricing</p>

        <p className="text-[#7F8490] text-[16px] font-normal">Contact Us</p>

        <p className="text-[#7F8490] text-[16px] font-normal">FAQs</p>
      </div>

      {/* Contact */}
      <div className="order-4 w-full sm:w-[45%] xl:w-[20%] space-y-4">
        <h1 className="text-[#222E48] font-medium text-[28px]">Contact Us</h1>

        <p className="text-[#7F8490] text-[16px] font-normal">
          Tejgaon, Dhaka 1258 Bangladesh
        </p>

        <p className="text-[#7F8490] text-[16px] font-normal">
          +88 0123 456789
        </p>

        <p className="text-[#7F8490] text-[16px] font-normal">
          hello@leadbox.com
        </p>
      </div>

      {/* Newsletter */}
      <div className="order-2 xl:order-4 w-[400px] space-y-6">
        <h1 className="text-[#222E48] font-medium text-[28px] leading-snug">
          Stay Informed With Our Newsletter
        </h1>

        <div className="relative rounded-[100px] border border-[#525FE1] overflow-hidden">
          <input
            type="email"
            placeholder="Email Address"
            required
            className="w-full placeholder-[#7F8490] px-6 pr-36 py-5 text-sm outline-none"
          />

          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer bg-[#251FAC] hover:bg-[#433be1] text-white px-6 py-3 text-sm font-semibold rounded-[100px] transition-all duration-300"
          >
            Subscribe
          </button>
        </div>
        <div></div>
      </div>
    </div>
  );
}
