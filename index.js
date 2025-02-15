const express = require('express');
const app = express();
const port = 8080;

const path = require("path");
const {v4: uuidv4} = require('uuid');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//public
app.use(express.static(path.join(__dirname, "public")));

//post  array 
let posts = [
  {
    id : uuidv4(),
    image: 'https://indiaforbeginners.com/wp-content/uploads/2024/11/Exterior-tent-1.jpg',
    heading : "Maha Kumbh Mela 2025",
    author: "By Mariellen Ward",
    content:
    `Come with us to the Kumbh Mela, February 7 – 10, 2025!
    The Maha Kumbh Mela is held only once every 12 years. And the Maha Kumbh Mela which will be held from January 13 to February 26, 2025 in Prayagraj, India is even more rare and auspicious.
    This Maha Kumbh Mela — which occurs after 12 Purna Kumbh Melas — happen only once every 144 years! In other words, this is one festival that is truly not to be missed. Even Conde Nast Traveller has said it is one of the best places to go in Asia in 2025.The Maha Kumbh Mela that occurs every 144 years is not just another Kumbh Mela. It is regarded as a spiritually significant event because it marks a unique celestial alignment that occurs only once in over a century.
    I attended the Kumbh Mela in Haridwar in 2010, and it was absolutely a life-changing experience for me. You can read about my adventures here: A story of transformation at the Kumbh Mela. It is probably the single most intense, exhilarating, terrifying, and transformative travel experiences of my life.The tents are very comfortable, with attached private washrooms. From the Shivir website: “Our luxurious tents represent a harmonious blend of modern comfort and traditional elegance.
    These specially appointed spacious tents, have been designed to provide guests with a luxurious retreat amidst the spiritual fervour of the Maha Kumbh Mela. The attention to detail in both design and amenities ensures a seamless fusion of opulence and cultural richness.`
  },
  {
    id: uuidv4(),
    image: 'https://travelsetu.com/apps/uploads/new_destinations_photos/destination/2024/06/27/97d37facd06096ac132798de0e20e840_1000x1000.jpg',
    author: 'Lindsay',
    heading: "Wat Traimit(Golden Buddha)",
    content: 
    `Bangkok Chinatown is the only real sightseeing, touristy thing I did in the city. I had wanted to stay in the area as it looked like a good place to stay, but that didn’t end up happening, so I just took the MRT to, I think, Hua Lamphong Station.
    I had to change on the way and exit and enter the two different stations. I really don’t think the transport system in Bangkok is very good; nothing is well integrated. I think the Seoul subway spoiled me. From the station it was about a ten minute walk or so to reach Wat Traimit. 
    I had found a self-guided walking tour online, so I used that as the basis for my walk but changed a few places around to save me doubling back in a couple of places.
    I headed out of the station, and it was about a five to ten minute walk to my first destination. It was a hot day with very little cloud cover and the sun was beating down on me as I walked. I passed the train station, which looked very nice Although the temple was undergoing a lot of restoration work meaning that the entrance was a little difficult to spot. It is the largest and most important Chinese temple in the area and its name means ‘dragon lotus temple’. Its original name was Wat Leng Noei Yi. To be honest, I didn’t find the temple that special, so not really worth the effort in my opinion. I think it would have been better to visit before or after the construction that was happening as it took away from the atmosphere of the place. After that I headed to the nearest 7-11 to pretty much down a large bottle of water as I was feeling pretty dehydrated. I enjoyed Chinatown and I would like to come back in the future to see it all lit up at night as it looks pretty cool.
    I was staying a bit too far away from it on this trip to make a return journey.`,
  },
  {
    id: uuidv4(),
    image: 'https://economysaudiarabia.com/wp-content/uploads/sites/2/2023/10/Jeddah-Al-Balad-1-e1696401897826.jpg',
    author: 'Donny',
    heading: "Al-Balad, Jeddah",
    content : 
    `When I started this blog in 2007, it was more of a highlights package of trips generally focusing on one place or aspect. My rule had been one blog per country unless I lived there, but I eventually realised that fewer blogs were appearing. Having got around quite a bit, I'm now revisiting many countries. It's getting trickier to get to completely new countries so I might break that rule on occasion. The PhD fortunately didn't curtail travelling with research in sub-Saharan Africa and India as well as the chance to attend conferences with a sneaky bit of travelling tacked on. Since then, postdoc positions in Japan and then the Netherlands (excluding covid times) provided travel opportunities due to research projects in Nepal, Brazil and Botswana as well as holidays wherever I could find mountains (sorely missed while living in the Netherlands).
    There are also mosques and shops and little markets here and there, I tried to start from the main gate – the Jeddah Old Gate. It’s pretty much been restored, there are remains around of the historic wall around the old city but they are not very visible. In fact they are sort of fenced off and mid-excavation. I wouldn’t be surprised if the whole of Al-Balad gets reconstructed as a tourist attraction, so it was really nice to visit before that happens.
    But Al-Balad was still a highlight. As bad as that traffic was I still felt the traffic was worse in Riyadh. Definitely a great place to explore and photograph! Don’t miss it if you are in Jeddah! The final piece in the Saudi puzzle comes next Sunday when I go snorkelling from Jeddah in the Red Sea. Thanks for reading today, take care wherever you are in the world, and… May the Journey Never End!`
  }
];

//Handling new blog  
app.get('/post/create', (req,res) =>{
  res.render("create.ejs");
});

//Handle New Post Submission 
app.post('/post', (req,res) => {
  let  {image, author, heading, content} = req.body;
  let id = uuidv4(); //unique id for the new post
  posts.push({id, image, author, heading, content});
  
  res.redirect('/post');
});

//New Created post displaying on Main Page 
app.get('/post' ,(req,res) => {
  res.render('index.ejs', {posts});
});

// Read More 
app.get('/post/:id' ,(req,res) => {
  let {id} = req.params;
  console.log(id);
  let post = posts.find((p)=> p.id === id);
  res.render('read.ejs', {post});
});


app.listen(port, () =>{
  console.log(`listening to port: ${port}`)
});








