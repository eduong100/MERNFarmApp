<h1>Backend:</h1>

The react uses an express server and a MongoDB to set up a fully working REST API + database. Communcation between the two is handled via Mongoose. 
We store and retrieve data according to the following mongoose schema: 
```
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    lowercase: true,
    enum: ["fruit", "vegetable", "dairy"],
  },
});
```
Thus every product stored has an id, name, price, and category. Mongoose allows the express server to connect via the default mongoDB local URL. Note that the data-base name is farmStand with the only collection being products: 
```
mongoose
  .connect("mongodb://localhost:27017/farmStand")
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!");
  })
  .catch((err) => {
    console.log("OH NO MONGO CONNECTION ERROR!");
    console.log(err);
  });
```
The express app listens on port 5000 given that our react development server has its url on localhost:3000. Express creates a REST API for the front-end to use on port 5000 using the following server endpoints (replace photos with products). Note that resources are returned as JSON at these endpoints.

Thus, to get a specific Product (say it has id 75) we send a GET request to http://localhost:5000/products/75

Several things on the server-side need to happen for smooth communication between the server and the front-end. First, our express app needs to be able to recognize when information sent is JSON therefore we call app.use(express.json()); In case we may deal with urlencoded data in the future, we also call app.use(express.urlencoded({ extended: true }));. Lastly, we call app.use(cors()); in order to relax securities and enable cross-origin sharing of resources (basically any local process can now access the server endpoints).

<h1>Frontend:</h1>

All frontend code is stored in the client folder. So far we only run the code in development mode (deployment will be saved for the future). Using npm start, our react app is hosted on http://localhost:3000/. 

For sending requests to the backend we use the Axios API. We set our proxy URL to the root of our backend server URL (i.e. http://localhost:5000) allowing us to make requests to express like so: axios.get(“/products/100002”, …). This allows us to avoid hardcoding URLs in the event our backend root changes. Axios expects a response from the server regardless of the HTTP request type meaning that our backend is coded to always give a response.


Routes on our front-end are handled by react-router. The router is responsible for loading components dynamically depending on the URL requested by the user. For example, requesting http://localhost:3000/products/new will get us the New component defined in new.js (a form for creating new Product entries). If a component seeks to display information held in our database, it sends a request to a server endpoint when the component loads (this is achieved using the useEffect hook). Information is received as JSON and is processed into a state hook for use by the component. PUT and DELETE requests sent by our frontend are sent as JSON. Functions are defined to send such requests based on user input (such as when they fill out a form and hit a submit button). 

<h1>How to Run:</h1>

First step is to install all the dependencies. Make sure you have the LTS version of Node installed (and consequently the LTS version of npm). Install dependencies using $npm install in both the main project folder as well as the client folder (run this command where the package.json files are). This will install both the server and client dependencies respectively. Note that this webapp was developed in a WSL 2.0 environment. 

Next make sure you have mongoDB installed (use the following for more info on installation for WSL). You will need to use one terminal to run the mongo daemon, one terminal to run the express server, and one terminal to run the react app in development mode. The commands for each terminal are $sudo mongod –dbpath ~/data/db, $node server.js, and $npm start (do npm start within client folder). Run the commands in the above order and the app should be ready to go.  Just navigate to http://localhost:3000/ in your browser (preferably chrome) and you are good to go.
