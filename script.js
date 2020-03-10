let lang = 'en';

function langToEn() {
    lang = 'en';
    document.getElementById('label-text').innerText = 'Type a song name below';
    document.getElementById('search-button').innerText = 'Search';
    document.getElementById('lang-en').style.textDecorationLine = 'underline';
    document.getElementById('lang-ja').style.textDecorationLine = 'none';
    document.getElementById('lang-ru').style.textDecorationLine = 'none';
    document.getElementById('lang-be').style.textDecorationLine = 'none';
    document.getElementById('info').innerHTML = 'This thing was made to get info about all recordings that an Ajikan\'s song is on quickly. I needed it for my personal reasons, but I decided that it may be useful for someone else. So, here it is, feel free to use it.\n' +
        '    <br/>\n' +
        '    GitHub repo is <a href="https://github.com/TimaGribanov/ajikan-database" target="_blank">here</a>.';
    document.getElementById('footer').innerHTML = '<p>Timofey Gribanov © 2020</p>\n' +
        '    <p>e-mail: <a href="mailto:t.gribanow@gmail.com">t.gribanow@gmail.com</a></p>'
}

function langToJa() {
    lang = 'ja';
    document.getElementById('label-text').innerText = '曲名を入力してください';
    document.getElementById('search-button').innerText = '検索';
    document.getElementById('lang-ja').style.textDecorationLine = 'underline';
    document.getElementById('lang-en').style.textDecorationLine = 'none';
    document.getElementById('lang-ru').style.textDecorationLine = 'none';
    document.getElementById('lang-be').style.textDecorationLine = 'none';
    document.getElementById('info').innerHTML = 'This thing was made to get info about all recordings that an Ajikan\'s song is on quickly. I needed it for my personal reasons, but I decided that it may be useful for someone else. So, here it is, feel free to use it.\n' +
        '    <br/>\n' +
        '    GitHub repo is <a href="https://github.com/TimaGribanov/ajikan-database" target="_blank">here</a>.';
    document.getElementById('footer').innerHTML = '<p class="ja">ティモフェイ・グリバノフ © 2020</p>\n' +
        '    <p class="ja">e-mail: <a href="mailto:t.gribanow@gmail.com">t.gribanow@gmail.com</a></p>'
}

function langToRu() {
    lang = 'ru';
    document.getElementById('label-text').innerText = 'Введите название песни';
    document.getElementById('search-button').innerText = 'Искать';
    document.getElementById('lang-ru').style.textDecorationLine = 'underline';
    document.getElementById('lang-ja').style.textDecorationLine = 'none';
    document.getElementById('lang-en').style.textDecorationLine = 'none';
    document.getElementById('lang-be').style.textDecorationLine = 'none';
    document.getElementById('info').innerHTML = 'Эту штуку я сделал, чтобы быстро получать информацию обо всех записях, на которых встречается какая-либо песня Asian Kung-fu Generation. Мне она нужна была для личных целей, но я подумал, что она ещё кому-то может пригодиться. Так что не стесняйтесь пользоваться.\n' +
        '    <br/>\n' +
        '    Репозиторий на GitHub <a href="https://github.com/TimaGribanov/ajikan-database" target="_blank">здесь</a>.';
    document.getElementById('footer').innerHTML = '<p>Тимофей Грибанов © 2020</p>\n' +
        '    <p>e-mail: <a href="mailto:t.gribanow@gmail.com">t.gribanow@gmail.com</a></p>'
}

function langToBe() {
    lang = 'be';
    document.getElementById('label-text').innerText = 'Увядзіце назву песні';
    document.getElementById('search-button').innerText = 'Шукаць';
    document.getElementById('lang-be').style.textDecorationLine = 'underline';
    document.getElementById('lang-ja').style.textDecorationLine = 'none';
    document.getElementById('lang-ru').style.textDecorationLine = 'none';
    document.getElementById('lang-en').style.textDecorationLine = 'none';
    document.getElementById('info').innerHTML = 'This thing was made to get info about all recordings that an Ajikan\'s song is on quickly. I needed it for my personal reasons, but I decided that it may be useful for someone else. So, here it is, feel free to use it.\n' +
        '    <br/>\n' +
        '    GitHub repo is <a href="https://github.com/TimaGribanov/ajikan-database" target="_blank">here</a>.';
    document.getElementById('footer').innerHTML = '<p>Цімафей Грыбанаў © 2020</p>\n' +
        '    <p>e-mail: <a href="mailto:t.gribanow@gmail.com">t.gribanow@gmail.com</a></p>'
}

function search() {
    $('.song').remove();

    let searchValue = document.getElementById('search-field').value;
    searchValue = '%' + searchValue + '%';

    let res = [];

    $.ajax({
        type: 'GET',
        url: 'https://ajikan-database.herokuapp.com/songs_records',
        async: true,
        dataType: 'json',
        success: function (data) {
            find(data);
        }
    });

    function find(inputJson) {
        alasql.promise('SELECT title, title_romaji, record_title, title_en, record_title, record_title_romaji INTO ? FROM ? WHERE title LIKE ? OR title_romaji LIKE ? OR title_en LIKE ?', [res,inputJson,searchValue,searchValue,searchValue])
            .then(function(data) {
                let tempSongs = 1;
                let tempRecords = 1;
                if(lang === 'en' || lang === 'ru' || lang === 'be') {
                    for(let i = 0;i < res.length;i++){
                        if(i === 0) {
                            document.getElementById('result').innerHTML += '<div id="song-'+ tempSongs +'" class="song">\n' +
                                '        <div id="song-title-'+ tempSongs +'" class="song-title"></div>\n' +
                                '        <div id="record-title-'+ tempSongs +'-'+ tempRecords +'" class="record-title"></div>\n' +
                                '    </div>';
                            document.getElementById('song-title-' + tempSongs).innerText = res[i].title_romaji;
                            document.getElementById('record-title-' + tempSongs + '-' + tempRecords).innerText = res[i].record_title_romaji;
                        } else {
                            if(res[i].title === res[i-1].title) {
                                tempRecords++;
                                document.getElementById('song-' + tempSongs).innerHTML += '<div id="record-title-'+ tempSongs +'-'+ tempRecords +'" class="record-title"></div>';
                                document.getElementById('record-title-' + tempSongs + '-' + tempRecords).innerText = res[i].record_title_romaji;
                            } else {
                                tempSongs++;
                                tempRecords = 1;
                                document.getElementById('result').innerHTML += '<div id="song-'+ tempSongs +'" class="song">\n' +
                                    '        <div id="song-title-'+ tempSongs +'" class="song-title"></div>\n' +
                                    '        <div id="record-title-'+ tempSongs +'-'+ tempRecords +'" class="record-title"></div>\n' +
                                    '    </div>';
                                document.getElementById('song-title-' + tempSongs).innerText = res[i].title_romaji;
                                document.getElementById('record-title-' + tempSongs + '-' + tempRecords).innerText = res[i].record_title_romaji;
                            }
                        }
                    }
                } else if(lang === 'ja') {
                    for(let i = 0;i < res.length;i++){
                        if(i === 0) {
                            document.getElementById('result').innerHTML += '<div id="song-'+ tempSongs +'" class="song">\n' +
                                '        <div id="song-title-'+ tempSongs +'" class="song-title ja-bold"></div>\n' +
                                '        <div id="record-title-'+ tempSongs +'-'+ tempRecords +'" class="record-title ja"></div>\n' +
                                '    </div>';
                            document.getElementById('song-title-' + tempSongs).innerText = res[i].title;
                            document.getElementById('record-title-' + tempSongs + '-' + tempRecords).innerText = res[i].record_title;
                        } else {
                            if(res[i].title === res[i-1].title) {
                                tempRecords++;
                                document.getElementById('song-' + tempSongs).innerHTML += '<div id="record-title-'+ tempSongs +'-'+ tempRecords +'" class="record-title ja"></div>';
                                document.getElementById('record-title-' + tempSongs + '-' + tempRecords).innerText = res[i].record_title;
                            } else {
                                tempSongs++;
                                tempRecords = 1;
                                document.getElementById('result').innerHTML += '<div id="song-'+ tempSongs +'" class="song">\n' +
                                    '        <div id="song-title-'+ tempSongs +'" class="song-title ja-bold"></div>\n' +
                                    '        <div id="record-title-'+ tempSongs +'-'+ tempRecords +'" class="record-title ja"></div>\n' +
                                    '    </div>';
                                document.getElementById('song-title-' + tempSongs).innerText = res[i].title;
                                document.getElementById('record-title-' + tempSongs + '-' + tempRecords).innerText = res[i].record_title;
                            }
                        }
                    }
                }
                res = [];
            }).catch(function(error) {
            console.log(error);
        });
    }
}