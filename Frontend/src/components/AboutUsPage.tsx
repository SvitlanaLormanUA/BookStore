import React, { useEffect, useState } from 'react';

export default function AboutUsPage() {
    const [previewGif, setPreviewGif] = useState('');
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        // Функція для отримання GIF-ів (якщо потрібно)
        function httpGetAsync(theUrl, callback) {
            const xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function() {
                if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                    callback(xmlHttp.responseText);
                }
            };
            xmlHttp.open("GET", theUrl, true);
            xmlHttp.send(null);
        }

        function tenorCallback_search(responsetext) {
            const responseObjects = JSON.parse(responsetext);
            const topGifs = responseObjects["results"];
            if (topGifs.length > 0) {
                setPreviewGif(topGifs[0]["media"][0]["nanogif"]["url"]);
            }
        }

        function grab_data() {
            const apiKey = "LIVDSRZULELA"; // Переконайтеся, що у вас є дійсний API-ключ
            const limit = 8;
            const searchTerm = "cute-boba-cat-eating";
            const searchUrl = `https://g.tenor.com/v1/search?q=${searchTerm}&key=${apiKey}&limit=${limit}`;
            httpGetAsync(searchUrl, tenorCallback_search);
        }

        grab_data();

        // Встановлення шляхів зображень для відображення
        const bookStorePics = [
           
            '/cafe-images/photo_5273966698866796467_w.jpg',
            '/cafe-images/photo_5273966698866796468_w.jpg',
            '/cafe-images/photo_5849349135206037084_y.jpg',
            '/cafe-images/photo_5273966698866796462_w.jpg',
            '/cafe-images/photo_5851569513038984525_y.jpg',
            '/cafe-images/photo_5851655704442680747_w.jpg',
            '/cafe-images/photo_5851371901593695688_w.jpg',
       
        ];
        setImages(bookStorePics);
    }, []); 
    return (
        <>
            <div className="about-us-page">
                <div className="about-us-page-header">
                    {previewGif && (
                        <img
                            id="cat-gif"
                            src={previewGif}
                            alt="Excited GIF"
                            style={{ width: '220px', height: '230px' }} 
                        />
                    )}
                    <h1 className="moto">Cozy Place in Your City</h1>
                </div>
                <div className="main-section">
                    <p>
                        Welcome to our cozy bookstore and cafe! Nestled in the heart of Korosten, within the picturesque Zhytomyr region, our place is a delightful escape for all book lovers and tea enthusiasts. 
                        Imagine curling up in a comfortable corner, enveloped in the inviting aroma of freshly brewed tea, as you lose yourself in the pages of your favorite book.
                    </p>
                    
            
                    <div className="image-gallery">
                        {images.map((image, index) => (
                            <img key={index} src={image} alt={`Gallery image ${index + 1}`} style={{ width: '100%', height: 'auto', marginBottom: '10px' }} />
                        ))}
                    </div>
                    <h3 className='workspace-moto'>Our space is more than just a place to read; it's a community hub.</h3>
                </div>
            </div>
        </>
    );
}
