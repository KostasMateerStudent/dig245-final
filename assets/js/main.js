/* javascript */

// $("#translateBtn").click(function () {
//   let textToTranslate = $("#textToTranslate").val();
//   console.log(textToTranslate);

//   // ping our api server, adding the input text to the url
//   fetch("http://localhost:3000/api/" + textToTranslate)
//     .then((response) => {
//       // convert to json
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data);

//       if (
//         data !=
//         `No translations found for text \\"${textToTranslate}\\" among available dictionaries`
//       ) {
//         // display on page
//         $(".translatedWord").html(`
//                 ${data.Translation.Heading} ${data.Translation.Translation}`);
//         console.log(data.Translation.Translation);
//       } else {
//         $(".translatedWord").html(`null`);
//       }
//     });
// });

$("#translateBtn").click(function () {
  let textToTranslate = $("#textToTranslate").val();
    window.localStorage.setItem("word", textToTranslate);
})

function translate() {
  let textToTranslate = window.localStorage.getItem("word");
  if (window.localStorage.getItem("word") == ""){
    $(".originalWord").html(`no word was given`);
    $(".translatedWord").html(`no word was given`);
    return;
  }
  console.log(textToTranslate);

  // ping our api server, adding the input text to the url
  fetch("http://localhost:3000/api/" + textToTranslate)
    .then((response) => {
      // convert to json
      return response.json();
    })
    .then((data) => {
      console.log(data);

      if (
        data !=
        `No translations found for text \\"${textToTranslate}\\" among available dictionaries`
      ) {
        // display on page
        $(".originalWord").html(`
                  ${data.Translation.Heading}`);
        $(".translatedWord").html(`
                 ${data.Translation.Translation}`);

        console.log(data.Translation.Translation);
      } else {
        $(".originalWord").html(`no word was given that was found in dictionaries`);
        $(".translatedWord").html(`no word was given that was found in dictionaries`);
      }
    });
};
