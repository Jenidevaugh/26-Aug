// useFetchProducts.js
import { useState, useEffect } from 'react';
import { CommerceABI } from "../../ABI/Commerce";
import { createPublicClient, http, fallback } from "viem";
import { rollux } from "viem/chains";

const Commercecontract = "0x2e0b6cb6dB7247f132567d17D0b944bAa503d21A";

{/*
const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [productsOff, setProductsOff] = useState([]);
  const [productsCount, setProductsCount] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const publicClient = createPublicClient({
      chain: rollux,
      transport: http()
    });

    const fetchData = async () => {
      try {
        const getProducts = await publicClient.readContract({
          address: Commercecontract,
          abi: CommerceABI,
          functionName: 'getAllProducts',
        });



        const getProductsCount = await publicClient.readContract({
          address: Commercecontract,
          abi: CommerceABI,
          functionName: 'proxy',
        });

        // Process and set products with images
        const productsWithImages = await Promise.all(
          getProducts.map(async (product) => {
            const response = await fetch(`https://api.pinata.cloud/data/pinList?cid=${product.image}`, {
              method: 'GET',
              headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI2MWUzYThkOC05ZDk0LTRhZTUtYTRkOS1mYTFkYjJmZjE4MTUiLCJlbWFpbCI6ImplbmlkZXZhdWdobnF4bjg0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIwODM1NGM5YzUzNDc0ZGRiNTYyNSIsInNjb3BlZEtleVNlY3JldCI6IjBiMTY1NDQwNGMxZDAwOTIzYmU3YzZjMDQzOTYwZGU3NzdmMDEyYmUwZGZjMjJiYjNiNDNmY2VmNDBhOTM3MjUiLCJleHAiOjE3NTU3NDg3NzV9.GTO6sKrnG9PmaCwIDXb1lwALHzwhBsqGk37mAHn21Uk',
              },
            });
            const imageData = await response.json();
            const imageUrl = `https://gateway.pinata.cloud/ipfs/${imageData.rows[0].ipfs_pin_hash}`;
            return { ...product, imageUrl };
          })
        );

        setProducts(productsWithImages);
        setProductsOff(getProducts); // Assuming getProductsOff needs the same data as products
        setProductsCount(getProductsCount);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { products, productsOff, productsCount, loading, error };
};

export default useFetchProducts;
*/}