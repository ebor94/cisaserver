import axios  from 'axios';
export const GetProductsListUsa = () =>{


    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://ceramiausa.com/api/products',
      headers: { 
        'Authorization': 'Basic CUlIWkozUzhUWjlBQ0RFMjc4VzE4MlNBRTRTQlhWOFQ3Og==', 
        'Cookie': 'PrestaShop-3e4993952f457f3c26e3187d55785470=def50200dcdebe755a6b492f652cc7eef40071d650dd2df3f1f01ad87c35a9493dc7fe791fa6250cddf476ce17ae363323e633b35b5066b0607169b0eb570d6ab0a7c46ab05c97f7446e38b8a9581f624050492627779733b6757a4d8ca2bb1b870467eca070888b20daf9b92011257aa729614b8a1b00b8ad13738e3665ff9ba189c036f0797976259d060f6b1ba492a93ba343099daf8c3d9b792b10b63d5ff03b8815ae0b55e9e38a1dc8d946c0a94ff028704c0f36493c4732580276e0c1d6f13c4559f11572f164b88487fbceb85fc1a125e039a3ff60'
      }
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });

}