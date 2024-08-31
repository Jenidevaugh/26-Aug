import React from "react";
import Slider from "react-slick";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import {
  newArrOne,
  newArrTwo,
  newArrThree,
  newArrFour,
} from "../../../assets/images/index";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";
import { useEffect, useState } from "react";
import { createPublicClient, createClient } from "viem";
import { CommerceABI } from "../../../ABI/Commerce";
import { rollux } from "viem/chains";
import { http } from "viem";
import { useNavigate } from "react-router-dom";

const Commercecontract = "0x2e0b6cb6dB7247f132567d17D0b944bAa503d21A";

const NewArrivals = () => {
  const [products, setProducts] = useState([]); // Initialize products as an empty array
  const [productsCount, setProductsCount] = useState(); // Initialize products as an empty array
const navigate = useNavigate()
   
const publicClient = createPublicClient({
  chain: rollux,
  transport: http('https://rpc.rollux.com')
});


//const walletClient = createWalletClient({
//  chain: rollux,
//  transport: custom(window.ethereum)
//});
  useEffect(() => {
    async function fetchData() {
    //  const [addressa] = await walletClient.getAddresses();
      try {
        const getProducts = await publicClient.readContract({
        //  account: addressa,
          address: Commercecontract,
          abi: CommerceABI,
          functionName: 'getAllProducts',
        });

        const getProductsCount = await publicClient.readContract({
        //  account: addressa,
          address: Commercecontract,
          abi: CommerceABI,
          functionName: 'proxy',
        });

        // Fetch images for each product based on the IPFS CID
        const productsWithImages = await Promise.all(
          getProducts.map(async (product) => {
            const options = {
              method: 'GET',
              headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI2MWUzYThkOC05ZDk0LTRhZTUtYTRkOS1mYTFkYjJmZjE4MTUiLCJlbWFpbCI6ImplbmlkZXZhdWdobnF4bjg0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIwODM1NGM5YzUzNDc0ZGRiNTYyNSIsInNjb3BlZEtleVNlY3JldCI6IjBiMTY1NDQwNGMxZDAwOTIzYmU3YzZjMDQzOTYwZGU3NzdmMDEyYmUwZGZjMjJiYjNiNDNmY2VmNDBhOTM3MjUiLCJleHAiOjE3NTU3NDg3NzV9.GTO6sKrnG9PmaCwIDXb1lwALHzwhBsqGk37mAHn21Uk',
              },
            };

            const response = await fetch(`https://api.pinata.cloud/data/pinList?cid=${product.image}`, options);
            const imageData = await response.json();

            // Assuming imageData.rows contains image data, adjust as needed
            const imageUrl = `https://gateway.pinata.cloud/ipfs/${imageData.rows[0].ipfs_pin_hash}`;

            return {
              ...product,
              imageUrl, // Add the image URL to the product object
            };
          })
        );

        // Update state with products and their associated images
        setProducts(productsWithImages);
        setProductsCount(getProductsCount);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const handleProductClick = (product) => {
    navigate(`/product-details/${product.id}`, { state: { item: product } });
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };



  return (
    <div className="w-full pb-16">
      <Heading heading="New Arrivals" />
      <Slider {...settings}>
        {products.map((product, index) => (
          <div key={index} className="px-2">
            <div
              onClick={() => handleProductClick(product)}
              className="cursor-pointer"
              style={{ height: '400px' }} // Adjust height as needed
            >
              <Product
                _id={product.id}
                img={product.imageUrl}
                productName={product.title}
                price={product.price.toString().slice(0, -18)}
                color={product.color || "N/A"}
                badge={product.badge || false}
                des={product.description}
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default NewArrivals;
