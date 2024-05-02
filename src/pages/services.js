import React from 'react';
import Navbar from '../components/navbar';

function Services() {
    const cardsData = [
        {
          id: 1,
          photo: "https://th.bing.com/th/id/OIP.RRtq_gLRn5qYe24X7OQV9QHaFj?rs=1&pid=ImgDetMain",
          header: "Earthwork",
          subheader: "Contour Trenching, Cut and Fill, Foundation, Piling, Ground Levelling"
        },
        {
          id: 2,
          photo: "https://th.bing.com/th/id/OIP.W77cLhlY22L1fBKbDdWcEAHaFG?rs=1&pid=ImgDetMain",
          header: "Structure",
          subheader: "Civil Structure, Form Work, Steel Work, Concrete Work"
        },
        {
          id: 3,
          photo: "https://theconstructor.org/wp-content/uploads/2020/08/How-to-Construct-Concrete-Block-Masonry.jpg",
          header: "Architecture",
          subheader: "Finishing Work, Masonry & Plaster, Flooring, Painting"
        },
        {
          id: 4,
          photo: "https://th.bing.com/th/id/OIP.oDBDLvyPNXN0ofAPf39w3AAAAA?rs=1&pid=ImgDetMain",
          header: "Landscape",
          subheader: "Living Element, Gardening, Landforms, Terrain"
        },
        {
          id: 5,
          photo: "https://th.bing.com/th/id/OIP.2UMQ8AfTw_M9UekW2E71nAHaEK?rs=1&pid=ImgDetMain0",
          header: "Infrastructure",
          subheader: "Roads, The Water and Sewer System"
        },
        {
          id: 6,
          photo: "https://s3media.angieslist.com/s3fs-public/living-room-with-shelves.jpeg",
          header: "Interior",
          subheader: "Fit Out Furniture, Built Up Furniture, Show Unit, Commercial & Private"
        }
      ];

    return (
        <React.Fragment>
            <Navbar/>
            <div>
                <h1 style={{ textAlign: "center", marginTop: "100px", fontWeight: "bold", fontSize: "30px"}}>Our Services</h1>
            </div>
            <div className="flex justify-center mt-20">
                <div className="grid grid-cols-3 gap-4">
                    {cardsData.map((card) => (
                        <div key={card.id} className="max-w-xs rounded overflow-hidden shadow-lg">
                            <div className="h-64">
                                <img className="object-cover w-full h-full" src={card.photo} alt={card.header} />
                            </div>
                            <div className="px-6 py-4">
                                <div className="font-bold text-m mb-2 text-center">{card.header}</div>
                                <p className="text-gray-700 text-sm text-center">{card.subheader}</p>
                            </div>
                        </div>
                    ))}
                    <div style={{ marginBottom: "50px" }} />
                </div>
            </div>
        </React.Fragment>
    );
}

export default Services;
