import React, { useEffect, useState } from "react";
import MemeCard from "../components/Card";
import { getAllMemes } from "../api/memes";

const HomePage = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        getAllMemes().then((memes) => {
            setData(memes.data.memes);
        });
    }, []);

   return (
    <div className="container">
        <div className="row">
            {data.map((el) => (
                <div className="col-md-4 col-sm-6" key={el.id}>
                    <MemeCard
                        img={el.url}
                        title={el.name}
                    />
                </div>
            ))}
        </div>
    </div>
);
}

export default HomePage;
