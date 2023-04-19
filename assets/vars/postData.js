const POST_DATA = [
  {
    id: "2",
    postImage: require("../../assets/images/Sea.jpg"),
    title: "Закат на Черном море",
    location: "Ukraine",
    comments: 3,
    likes: 200,
    commentsTotal: 3,
    comments: [
      {
        id: "1",
        userAvatar: require("../../assets/images/Ellipse.png"),
        text: "Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!",
        data: "09 июня, 2020",
        time: "08:40",
      },
      {
        id: "2",
        userAvatar: require("../../assets/images/UserIcon.jpg"),
        text: "A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.",
        data: "09 июня, 2020",
        time: "04:14",
      },
      {
        id: "3",
        userAvatar: require("../../assets/images/Ellipse.png"),
        text: "Thank you! That was very helpful!.",
        data: "09 июня, 2020",
        time: "09:20",
      },
    ],
  },
];

export default POST_DATA;
