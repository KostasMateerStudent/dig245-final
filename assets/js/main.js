// saves the word data in the storage
$("#translateBtn").click(function () {
  let textToTranslate = $("#textToTranslate").val();
  window.sessionStorage.setItem("word", textToTranslate);
});

// grabs word from storage, grabs the translation
function translate() {
  let textToTranslate = window.sessionStorage.getItem("word");
  if (window.sessionStorage.getItem("word") == "") {
    $(".originalWord").html(`no word was given`);
    $(".translatedWord").html(`no word was given`);
    return;
  }
  console.log(textToTranslate);

  // ping our api server, adding the input text to the url
  fetch("https://dig245-final-beta.vercel.app/api/" + textToTranslate)
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
        $(".originalWord").html(
          `no word was given that was found in dictionaries`
        );
        $(".translatedWord").html(
          `no word was given that was found in dictionaries`
        );
      }
    })
    .catch((err) => console.log(err));
}
