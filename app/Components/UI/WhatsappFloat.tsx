import Image from "next/image";
import Link from "next/link";

const WhatsappFloat = () => {
  return (
    <Link href={"https://wa.me/+0201144094269"} target="_blank" className="fixed bottom-22 md:bottom-8 right-8 z-49 cursor-pointer">
      <Image
        src={"/whatsapp-icon-logo.svg"}
        alt="whatsapp logo"
        className="w-13 h-13 rounded-full"
        width={150}
        height={150}
      />
    </Link>
  );
};

export default WhatsappFloat;
