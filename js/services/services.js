 const postData = async (url, data) => {
   const resul = await fetch(url, {
     method: "POST",
     body: data,
     headers: {
       'Content-type': 'aplication/json'
     }
   });
   return await resul.json();
 };
   const getResource = async (url) => {
     const resul = await fetch(url);
     if (!resul.ok) {
       throw new Error(`Could not fetch ${url}, status: ${res.status}`)
     }
     return await resul.json();
   };

 export {postData};
 export {getResource};
