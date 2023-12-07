import axios from "axios";

// const apiUrl = "https://picsum.photos/v2/list";

export const getImage = async () => {
   try {
       const response = await axios.get(`https://picsum.photos/v2/list`);
       return response.data;
   } catch (e) {
       console.error('Error fetching data:', e);
       throw e;
   }
}



