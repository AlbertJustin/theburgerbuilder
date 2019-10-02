import axios from "axios";

const Instance = axios.create({
    baseURL: "https://reactburgerbuilder-d2785.firebaseio.com/"
});

export default Instance;