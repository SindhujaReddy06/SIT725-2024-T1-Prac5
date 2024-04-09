const submitForm = () => {
    let formData = {};
    formData.title = $('#title').val();
    formData.image = $('#image').val();
    formData.link = $('#subTitle').val();
    formData.description = $('#description').val();

    // Send form data to server
    $.ajax({
        url: '/api/cards',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function(response) {
            console.log(response);
            addCardToPage(formData); // Add new card to the webpage
        },
        error: function(xhr, status, error) {
            console.error(error);
        }
    });
};

const addCardToPage = (cardData) => {
    const cardHtml = `<div class="col s4 center-align">
        <div class="card medium">
            <div class="card-image waves-effect waves-block waves-light bird-card">
                <img class="activator bird-image" src="${cardData.image}">
            </div>
            <div class="card-content">
                <span class="card-title activator grey-text text-darken-4">${cardData.title}<i class="material-icons right">more_vert</i></span>
                <p><a href="#">${cardData.link}</a></p>
            </div>
            <div class="card-reveal">
                <span class="card-title grey-text text-darken-4">${cardData.title}<i class="material-icons right">close</i></span>
                <p class="card-text card-desc-color">${cardData.description}</p>
            </div>
        </div>
    </div>`;
    
    $("#card-section").append(cardHtml);
};

const fetchAndDisplayCards = () => {
    $.ajax({
        url: '/api/cards',
        method: 'GET',
        success: function(response) {
            const cards = response.data;
            cards.forEach(card => {
                addCardToPage(card);
            });
        },
        error: function(xhr, status, error) {
            console.error(error);
        }
    });
};

$(document).ready(function () {
    $('.bird-card').click(function(event) {
        event.preventDefault();
        var $cardReveal = $(this).closest('.card').find('.card-reveal');
        $cardReveal.slideToggle();
    });
    $('.materialboxed').materialbox();
    $('#formSubmit').click((event) => {
        event.preventDefault();
        submitForm(); // Call the submitForm function when the submit button is clicked
    });
    $('.modal').modal();

    // Fetch and display cards when the page is loaded
    fetchAndDisplayCards();
});