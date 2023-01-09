import React  from 'react'
import {useState , useEffect} from 'react'
import MasonaryLayout from './MasonryLayout';
import { useParams } from 'react-router-dom'; // what are currently passed parameters in url
import Spinner from './Spinner'
import {client} from '../client'
import { feedQuery, searchQuery } from '../utils/data';


const Feed = () => {
  const [loading , setLoading] = useState(false);
  const [pins , setPins] = useState();
  
  const {categoryId} = useParams();
  

  useEffect( () => {
    setLoading(true);
    if(categoryId) {
      const query = searchQuery(categoryId);

      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
    else {
      setLoading(true);

      client.fetch(feedQuery)
      .then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  } , [categoryId]);


  if(loading) return <Spinner message = "We are loading new idea to your feed!"/>
  if(!pins?.length) return <h2>No pins found</h2>
  return (
    <div>
      {pins && <MasonaryLayout pins ={pins}/>}
    </div>
  )
}

export default Feed
