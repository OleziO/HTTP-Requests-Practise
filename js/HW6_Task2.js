$(".search").click((event) => {
    event.preventDefault();
    let myRequest = new XMLHttpRequest();
    const MOVIE_NAME = $(".movieName").val();
    myRequest.open(
        "GET",
        `http://www.omdbapi.com/?s=${MOVIE_NAME}&plot=full&apikey=1046e662`
    );
    myRequest.addEventListener("load", (res) => {
        let resultSearch = JSON.parse(res.srcElement.response)["Search"];
        if (!resultSearch)
            return alert('No movies / games found');
        $(".film-cards-wrapper").html("");
        for (let i = 0; i < resultSearch.length; i++) {
            $(".film-cards-wrapper").append(`
        <div class="film-card">
            <img src="${resultSearch[i]["Poster"]}" alt="poster">
            <h2>${resultSearch[i]["Title"]}</h2>
            <p class="movie-type">${resultSearch[i]["Type"]}</p>
            <p class="movie-year">${resultSearch[i]["Year"]}</p>
            <button class="btn btn-success more-details">
                More details
            </button>
        </div>`);
        }
    });
    myRequest.send();
    $('.film-cards-wrapper').fadeIn(300, () => {
        $('.film-cards-wrapper').css('display', 'flex');
    });
});

$("body").click((event) => {
    let myRequest = new XMLHttpRequest();
    if ($(event.target).hasClass("more-details")) {
        const MOVIE_NAME = $(event.target).parent().children().eq(1).text();

        myRequest.open(
            "GET",
            `http://www.omdbapi.com/?t=${MOVIE_NAME}&plot=full&apikey=1046e662`
        );

        myRequest.addEventListener("load", (res) => {
            let resultSearch = JSON.parse(res.srcElement.response);
            let rating = resultSearch["Ratings"];
            if (!rating)
                return alert('No info about movies / games found');
            let ratingStr = "";
            for (let i = 0; i < rating.length; i++) {
                ratingStr += rating[i]["Source"] + " " + rating[i]["Value"] + " | ";
            }
            $(".full-info-block").append(`
        <img src="${resultSearch["Poster"]}" alt="">
        <div class="info-wrapper">
            <h1>${resultSearch["Title"]}</h1>
            <br><p>
               ${resultSearch["Rated"]} 
               ${resultSearch["Year"]} 
               ${resultSearch["Genre"]}
            </p>
            <p>${resultSearch["Plot"]}</
            <p>
                <strong>Written by: </strong>
                ${resultSearch["Writer"]}
            </p>
            <p>
                <strong>Directored by: </strong>
                ${resultSearch["Director"]}
            </p>
            
            <p>
                <strong>Starring: </strong>
                ${resultSearch["Actors"]}
            </p>
            <p>
                <strong>BoxOffice: </strong>
                ${resultSearch["BoxOffice"]}
            </p>
            <p>
                <strong>Awards: </strong>
                ${resultSearch["Awards"]}
            </p>
            <p>
                <strong>Ratings: </strong>
                ${ratingStr}
            </p>
        </div>`);
        $(".full-info-wrapper").fadeIn(100, () => {
            $(".full-info-wrapper").css('display', 'flex')
        });
        });
        myRequest.send();
    } else if ($(event.target).hasClass("full-info-wrapper")) {
        $(".full-info-block").html("");
        $(".full-info-wrapper").fadeOut(100);
    }
});