$("#translateBtn").click(function () {
  let textToTranslate = $("#textToTranslate").val();
    window.sessionStorage.setItem("word", textToTranslate);
})

function translate() {
  let textToTranslate = window.sessionStorage.getItem("word");
  if (window.sessionStorage.getItem("word") == ""){
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
