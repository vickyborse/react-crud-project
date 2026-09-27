import { useEffect, useState } from "react";
import { getPost } from "../api/PostApi";
import { deletePost } from "../api/PostApi";
import { Form } from "./Form";
import "../App.css";
export const Posts = () => {

    const [data,setData]=useState([]);
    const [updateDataApi,setUpdateDataApi] = useState({});

     const getPostData = async () => {
    
      const res = await getPost();
      console.log(res.data);
      setData(res.data);

  };

  useEffect(() => {
    getPostData();
  }, []);

  const handleDeletePost =  async (id) =>{

    try{

    
         const res = await  deletePost(id);
         

         if(res.status === 200)
         {
           const newUpdatedPost = data.filter((curPost)=>{

            return curPost.id!==id;
           });
           setData(newUpdatedPost);
         }
         
         }catch(error){
            console.log(error);
        }

           
  };

  const handleUpdatePost =(curElem)=>setUpdateDataApi(curElem);

  return(
  <>
  <section>
    <Form 
    data={data} 
    setData={setData} 
    updateDataApi={updateDataApi} 
    setUpdateDataApi={setUpdateDataApi} />
  </section>
  <section className="section-post">
    <ol>
        {
            data.map((curElem)=>{
                const{id,body,title}=curElem;
                return (
                <li key={id}>
                    <p>
                       Titel:{title} 
                    </p>
                    <p>
                        Body:{body} 
                    </p>

                    <button onClick={()=> handleUpdatePost(curElem)} >Edit</button>
                    <button className="btn-delete" onClick={()=>handleDeletePost(id)}>Delete</button>


                </li>

                );

            })
        }
    </ol>
  </section>
 
  </>
   );
};