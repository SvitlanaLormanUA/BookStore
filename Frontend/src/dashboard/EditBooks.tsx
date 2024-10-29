import { useLoaderData, useParams, useLocation } from "react-router-dom";

const EditBooks = () => {

   const {id} = useParams();
   const {title, author, year, genre, description, img, price, sale, publisher, language, start } 
   = useLoaderData();

   
   fetch (`http://localhost:3000/book/${id}`)
   .then(res => res.json().then(data => {
       console.log(data)
   }))
   return (
     <></>
   );
}

export default EditBooks;
