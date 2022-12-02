/* javascript */

$("#translateBtn").click(function () {
  let textToTranslate = $("#textToTranslate").val();
  console.log(textToTranslate);

  const cyrillicPattern = /^[\u0400-\u04FF]+$/;

  console.log("Привет:", cyrillicPattern.test("Привіт"));
  console.log("Hello:", cyrillicPattern.test("Hello"));

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
        $(".randomUser").html(`
                ${data.Translation.Heading} ${data.Translation.Translation}`);
        console.log(data.Translation.Translation);
      } else {
        $(".randomUser").html(`null`);
      }
    });
});
