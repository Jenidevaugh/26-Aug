import Banner from "../../components/Banner/Banner";
import Header from "../../components/home/Header/Header";
import Footer from "../../components/home/Footer/Footer";
import FooterBottom from "../../components/home/Footer/FooterBottom";
import { Link, useNavigate } from "react-router-dom";
import { FilledInput, FormControl, FormControlLabel, FormLabel, Input, Radio, RadioGroup } from "@mui/material";
import { FaFileUpload, FaInfo } from "react-icons/fa";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { ApplicationAccessTokenService, FleekSdk, PersonalAccessTokenService } from '@fleek-platform/sdk';
//import * as fs from 'node:fs/promises';
//import * as fs from 'fs';
//import axios from 'axios'
//const FormData = require('form-data')
//const fs = require('fs')
import { CommerceABI } from "../../ABI/Commerce";
import { PinataSDK } from "pinata";
import { createPublicClient, createWalletClient, custom } from "viem";
import { rollux } from "viem/chains";
import { http } from "viem";


const JWT1 = "2QYNJR2bnKywCLw-rRbZEKUyogSutCTpDIUbiWIsPWeHyFEFjr1O2yPh7l43LhP8";
const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhMDk5NzQ5Ni00ZjQxLTQyZmMtOGNlMS0zOTcyOWQ0NWYzNDYiLCJlbWFpbCI6ImNocmlzdGlnaWFub0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMmRiZjRiMmM4OTIwNjAyMDYwMTciLCJzY29wZWRLZXlTZWNyZXQiOiJjMzE5M2U3Mjk0NzBmZGFjMGFlZGI0MjE4ZDlkMzA5OTBjMmNiYmE0NmM4Yjg4YTc0MWNlYTIzZGU0N2U0OWVlIiwiaWF0IjoxNzIzNzQxNDQ3fQ.pTE6Y4UR_ZBTwZu_xBqAI14krzMcz1joPPuXnsSw07M'


const publicClient = createPublicClient({
  chain: rollux,
  transport: http()
});


const walletClient = createWalletClient({
  chain: rollux,
  transport: custom(window.ethereum)
});


const AppProduct = () => {

  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [mintCap, setMintCap] = useState("");
  const [cid, setCid] = useState("");
  const { address, isConnected } = useAccount();
  const [fileImport, setFileImport] = useState(null);
  const history = useNavigate();

  const Commercecontract = "0x2e0b6cb6dB7247f132567d17D0b944bAa503d21A";

  // useEffect(() => {
  //   if (!isConnected || !address) {
  //     history('/signin'); // redirect to signin page if not connected or no address
  //   }
  // }, [isConnected, address, history]);
  //

  function getFile(event) {
    setFileImport(URL.createObjectURL(event.target.files[0]));
  }

  // const pinFileToIPFS = async () => {
  //   const formData = new FormData();
  //   const src = fileImport;
  //
  //   const file = fs.createReadStream(src)
  //   formData.append('file', file)
  //
  //   const pinataMetadata = JSON.stringify({
  //     name: 'File name111',
  //   });
  //   formData.append('pinataMetadata', pinataMetadata);
  //
  //   const pinataOptions = JSON.stringify({
  //     cidVersion: 0,
  //   })
  //   formData.append('pinataOptions', pinataOptions);
  //
  //   try {
  //     const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
  //       maxBodyLength: "Infinity",
  //       headers: {
  //         'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
  //         'Authorization': `Bearer ${JWT}`
  //       }
  //     });
  //     console.log(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const JWTS = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhMDk5NzQ5Ni00ZjQxLTQyZmMtOGNlMS0zOTcyOWQ0NWYzNDYiLCJlbWFpbCI6ImNocmlzdGlnaWFub0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiYjZjNWE2ZmI5YjVhYTU5NGYyZWYiLCJzY29wZWRLZXlTZWNyZXQiOiJkZDJmMzQ3ZmM3ZDRiNTc5N2MwYzkxYzE0YTg0NjUyZmM2N2MxNDE2YzJiYzMyMzU2OGE2NjlmYjAwMzE1M2JhIiwiZXhwIjoxNzU1NDA3NTAxfQ.kcNBNtbEQmL9OPute2T9EmdiQLkQ1Fb2ev_M7A_WcXA"
  const pinata = new PinataSDK({
    pinataJwt: JWTS,
    pinataGateway: "amber-quick-mockingbird-55.mypinata.cloud",

  });

  //Either This Example1 for Pinning to Pinata IPFS 
  async function Upload() {

    try {

      const form = new FormData();
      form.append("file", fileImport);
      form.append("pinataMetadata", "{\n  \"name\": \"Test\"\n}");

      const options = {
        method: 'POST',
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhMDk5NzQ5Ni00ZjQxLTQyZmMtOGNlMS0zOTcyOWQ0NWYzNDYiLCJlbWFpbCI6ImNocmlzdGlnaWFub0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiYzgxNjAzNDU3MGNlMGU0MWFiOGUiLCJzY29wZWRLZXlTZWNyZXQiOiI0YTQwMDRkMWFhZTA1OTg5NWUxN2RmODg4NWZjYThlYjI2ZWExYjZiMmRiNmQ2NGVjYzM2ZTY3OGNiY2ZhYTNmIiwiZXhwIjoxNzU1NDA4MTkxfQ.gSuVuUi74ff8-eQlSEXpyrvoZZIwusPrMKA2t7ObDwc',
          'Content-Type': 'multipart/form-data'
        }
      };

      options.body = form;

      fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));


    } catch (error) {
      console.log(error);
    }
  }
  //Or This Example2 for Pinning to Pinata IPFS 
  const handleSubmission = async () => {
    try {
      const formData = new FormData();
      Array.from(fileImport).forEach((file) => {
        formData.append("file", file);
      });

      //Metadata Struct
      const metadata = JSON.stringify({
        name: "File name",
      });
      formData.append("pinataMetadata", metadata);

      const options = JSON.stringify({
        cidVersion: 0,
      });
      formData.append("pinataOptions", options);

      const res = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${JWT}`,
          },
          body: formData,
        }
      );
      const resData = await res.json();
      console.log(resData);
    } catch (error) {
      console.log(error);
    }
  };


  const handleAddProduct = async () => {
    try {
      const [addressa] = await walletClient.getAddresses();
      const publishProduct = await walletClient.writeContract({
        account: addressa,
        address: Commercecontract,
        abi: CommerceABI,
        functionName: 'publishProduct',
        args: [productName, description, price, cid, category, mintCap],
      });
      console.log("Product published:", publishProduct);
    } catch (error) {
      console.error("Error publishing product:", error);
    }
  };

  console.log(category);

  return (
    <>
      <Header />
      <div className="flex-col w-950 my-10 mx-2">
        <div className="w-full bg-ash bg-opacity-40 rounded mx-auto border px-4 py-6 mr-2">
          <h4>
            You have a total of {200} products listed -{" "}
            <span className="text-italics hover:pointer-cursor">click to view</span>
          </h4>
        </div>

        <div className="w-full my-2 bg-black bg-opacity-10 mx-auto border px-4 py-6">
          <p>Add New Product</p>
          <div className="w-full bg-ash bg-opacity-40 rounded mx-auto border px-4 py-6 mr-2">
            <div className="my-4">
              <p>Product Name</p>
              <Input
                className="w-90"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />

              <p className="mt-5">Choose product category from list</p>
              <div className="flex-col">
                <FormControl>
                  <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
                    <label>
                      <Radio value="shoes" /> Shoes
                    </label>
                    <label>
                      <Radio value="clothes" /> Clothes
                    </label>
                    <label>
                      <Radio value="tech" /> Tech
                    </label>
                    <label>
                      <Radio value="house" /> House
                    </label>
                  </RadioGroup>
                </FormControl>
              </div>

              <p className="mt-5">Product Description</p>
              <FilledInput
                className="mt-5 w-full resize-none overflow-auto"
                multiline
                minRows={3} // Optional: Set minimum rows to control initial height
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <p className="mt-4">Price</p> $
              <Input
                className="w-70"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />

              <p className="mt-4">Mint Cap</p>
              <Input
                className="w-70"
                value={mintCap}
                onChange={(e) => setMintCap(e.target.value)}
              />
            </div>

            <div className="mt-7">
              <p>Upload Product Image</p>
              <div className="w-30 bg-blue bg-opacity-20 py-2 px-2 flex justify-center relative">
                <input
                  type="file"
                  onChange={getFile}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <p className="my-5 p-10 mx-2 flex items-center cursor-pointer">
                  <FaFileUpload /> Choose Image
                </p>
              </div>
            </div>

            {fileImport && (
              <div className="mt-5">
                <img src={fileImport} alt="Product Preview" className="w-64 h-64 object-cover" />
              </div>
            )}

            <p className="mt-4">IPFS IMG CID Link</p>
            <Input
              className="w-70"
              value={cid}
              onChange={(e) => setCid(e.target.value)}
            />
            <div className="flex-col">
              <FormControl>
                <RadioGroup>
                  <label className="flex items-center gap-2">
                    <Radio value="approval" /> By Approval <p>(1.5% fee)</p>
                  </label>
                  <label className="flex items-center gap-2">
                    <Radio value="fullPayment" /> Full Payment <p>(0.5% fee)</p>
                  </label>
                </RadioGroup>
              </FormControl>
            </div>

            <div>
              <button onClick={handleAddProduct} className="w-90% p-2 border rounded-lg py-2 bg-blue hover:bg-black duration-300 text-white text-lg font-titleFont b-20 my-5">
                Publish Product
              </button>
            </div>

          </div>
        </div>

      </div >
      <Footer />
      <FooterBottom />
    </>
  );
};

export default AppProduct;
