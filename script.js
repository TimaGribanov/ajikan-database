

function search() {
    $('.result').remove();
    $('.result-hr').remove();

    let searchValue = document.getElementById('search-field').value;
    searchValue = '%' + searchValue + '%';

    let res = [];

    $.ajax({
        type: 'GET',
        url: 'https://ajikan-database.herokuapp.com/songs_records',
        async: true,
        dataType: 'json',
        success: function (data) {
            console.log(data);
            find(data);
        }
    });

    function find(inputJson) {
        alasql.promise('SELECT title, title_romaji, record_title, record_title_romaji INTO ? FROM ? WHERE title LIKE ? OR title_romaji LIKE ? OR title_en LIKE ?', [res,inputJson,searchValue,searchValue,searchValue])
            .then(function(data) {
                console.log(res);
                for(let i = 0;i < res.length;i++){
                    document.getElementById('result').innerHTML += '<div id="song-' + i + '" class="answer">\n' +
                        '            <div id="song-title-' + i + '" class="answer-eus"></div>\n' +
                        '            <div id="song-records-' + i + '" class="answer-right">\n' +
                        '            </div>\n' +
                        '        </div>\n<hr class="result-hr"/>';
                    document.getElementById('song-title-' + i).innerText = res[i].title_romaji;
                    document.getElementById('song-records-' + i).innerText = res[i].record;
                }
                res = [];
            }).catch(function(error) {
            console.log(error);
        });
    }
}