export const base_url =
  "https://academics.newtonschool.co/api/v1/bookingportals";

const headers = {
  "Content-Type": "application/json",
  projectId: process.env.PROJECT_ID,
};

const offers = [
  {
    title: "OneCard NCEMI Offer!",
    desc: "Up to 10% off + NCEMI on Flights with OneCard Credit Card EMI!",
    coupon: "Use Coupon Code ONECARDEMI",
  },
];

const offerCards = [
  {
    id: 1,
    url: "https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_260,h_205,dpr_2/offermgmt/images/banner/RR_TatkaalDeals_F_1101.jpg",
  },
  {
    id: 2,
    url: "https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_260,h_205,dpr_2/offermgmt/images/banner/RR_DOTW_Mauritius_F_1501.jpg",
  },
  {
    id: 3,
    url: "https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_260,h_205,dpr_2/offermgmt/images/BBD/CTINT_RR_FLIGHTS_29052023.png",
  },
  {
    id: 4,
    url: "https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_260,h_205,dpr_2/offermgmt/images/banner/RR_DOTW_Ayodhya_F_1501.jpg",
  },
  {
    id: 5,
    url: "https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_260,h_205,dpr_2/offermgmt/images/banner/RR_CTTHAI_F_2012.jpg",
  },
  {
    id: 6,
    url: "https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_260,h_205,dpr_2/offermgmt/images/BBD/GiftCards_RR_12072023.png",
  },
];

const packages = [
  {
    id: 1,
    url: "https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_235,h_122,dpr_2/offermgmt/images/banner/BSB_ICICI_F_1201.jpg",
  },
  {
    id: 2,
    url: "https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_235,h_122,dpr_2/offermgmt/images/banner/BSB_AUCC_F_1201.jpg",
  },
  {
    id: 3,
    url: "https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_235,h_122,dpr_2/offermgmt/images/banner/BSB_MBKFEST_F_1801.jpg",
  },
  {
    id: 4,
    url: "https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_235,h_122,dpr_2/offermgmt/images/banner/BSB_exploreall_Packages_1912_1.jpg",
  },
  {
    id: 5,
    url: "https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_235,h_122,dpr_2/offermgmt/images/banner/BSB_dubai_packages_1912_1.jpg",
  },
  {
    id: 6,
    url: "https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_235,h_122,dpr_2/offermgmt/images/banner/BSB_srilanka_packages_1912_1.jpg",
  },
];

const mobileDownload =
  "https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_983,h_247,dpr_2/offermgmt/images/qrCode_6.png";

const popularDestinations = [
  {
    id: 1,
    place: "Goa",
    properties: 3051,
    url: "https://fastui.cltpstatic.com/image/upload/w_176,h_178,f_auto,q_auto,c_fill,e_sharpen:80,g_auto,fl_progressive/offermgmt/hotelsCommonImages/tripSuggestor/goa.jpg",
  },
  {
    id: 2,
    place: "Delhi",
    properties: 2436,
    url: "https://fastui.cltpstatic.com/image/upload/w_176,h_178,f_auto,q_auto,c_fill,e_sharpen:80,g_auto,fl_progressive/offermgmt/hotelsCommonImages/tripSuggestor/delhi.jpg",
  },
  {
    id: 3,
    place: "Bangalore",
    properties: 2500,
    url: "https://fastui.cltpstatic.com/image/upload/w_176,h_178,f_auto,q_auto,c_fill,e_sharpen:80,g_auto,fl_progressive/offermgmt/hotelsCommonImages/tripSuggestor/bangalore.jpg",
  },
  {
    id: 4,
    place: "Jaipur",
    properties: 920,
    url: "https://fastui.cltpstatic.com/image/upload/w_176,h_178,f_auto,q_auto,c_fill,e_sharpen:80,g_auto,fl_progressive/offermgmt/hotelsCommonImages/tripSuggestor/Jaipur.png  ",
  },
  {
    id: 5,
    place: "Pattaya",
    properties: 1850,
    url: "https://fastui.cltpstatic.com/image/upload/w_176,h_178,f_auto,q_auto,c_fill,e_sharpen:80,g_auto,fl_progressive/offermgmt/hotelsCommonImages/tripSuggestor/Pattaya.png",
  },
];

const dates = [
  {
    id: 1,
    date: "Mon",
  },
  {
    id: 2,
    date: "Tue",
  },
  {
    id: 3,
    date: "Wed",
  },
  {
    id: 4,
    date: "Thu",
  },
  {
    id: 5,
    date: "Fri",
  },
  {
    id: 6,
    date: "Sat",
  },
  {
    id: 7,
    date: "Sun",
  },
];

export {
  offerCards,
  offers,
  packages,
  mobileDownload,
  popularDestinations,
  headers,
  dates,
};
