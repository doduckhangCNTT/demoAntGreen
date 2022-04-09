import React from "react";

const InfoEndow = () => {
  const infoEndow = [
    {
      id: "1",
      img: "https://bizweb.dktcdn.net/100/344/983/themes/704702/assets/policy_images_1.png?1637826117842",
      title: "Mien Phi van chuyen",
      content: "Cho don hang > 5tr",
    },
    {
      id: "2",
      img: "https://bizweb.dktcdn.net/100/344/983/themes/704702/assets/policy_images_1.png?1637826117842",
      title: "Mien Phi van chuyen",
      content: "Cho don hang > 5tr",
    },
    {
      id: "3",
      img: "https://bizweb.dktcdn.net/100/344/983/themes/704702/assets/policy_images_1.png?1637826117842",
      title: "Mien Phi van chuyen",
      content: "Cho don hang > 5tr",
    },
    {
      id: "4",
      img: "https://bizweb.dktcdn.net/100/344/983/themes/704702/assets/policy_images_1.png?1637826117842",
      title: "Mien Phi van chuyen",
      content: "Cho don hang > 5tr",
    },
  ];
  return infoEndow.map((item, index) => {
    return (
      <div
        key={index}
        className="max-w-sm rounded-xl flex items-center space-x-4"
      >
        <div className="shrink-0">
          <img className="h-12 w-12" src={item.img} alt="ChitChat Logo" />
        </div>
        <div>
          <div className="text-xl font-medium text-black">{item.title}</div>
          <p className="text-slate-500">{item.content}</p>
        </div>
      </div>
    );
  });
};

export default InfoEndow;
