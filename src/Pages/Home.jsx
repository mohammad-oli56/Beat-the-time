import React from 'react';
import ImageSlider from '../component/ImageSlider';
import Faquestion from '../component/Faquestion';
import { useLoaderData } from 'react-router';
import Event from '../component/Event';

const Home = () => {
    const data = useLoaderData()
    console.log(data)
    return (
        <div>
            <ImageSlider></ImageSlider>
           <div className="mx-3 my-6 grid gap-6 
                grid-cols-1 
              
                md:grid-cols-2 
                lg:grid-cols-3">
  {data.slice(0, 6).map(event => (
    <Event key={event._id} dat={event} />
  ))}
</div>

            <Faquestion></Faquestion>
        </div>
    );
};

export default Home;