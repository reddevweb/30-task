/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
   
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    let adv =  document.querySelectorAll(".promo__adv img"),
        poster = document.querySelector('.promo__bg'),
        genre = document.querySelector('.promo__genre'),
        moviesList = document.querySelector('.promo__interactive-list'),
        addForm = document.querySelector('form.add'),
        addInput = addForm.querySelector('.adding__input'),
        checkbox = addForm.querySelector('[type="checkbox"]');

    
    addForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let newFilm = addInput.value;
        const favorite = checkbox.checked;
        if (newFilm) {

            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`;
            }
            if (favorite) {
                console.log("Добавляем любимый фильм");
            }
            movieDB.movies.push(newFilm);
            sortArr( movieDB.movies);
            createMovieList(movieDB.movies, moviesList);

        }
        // addForm.reset();
        event.target.reset();

    });
        const deleteAdv = (arr) => {
            arr.forEach(function(item){
                item.remove();
            });
        };
        
        
        const makeChanges = () => {
            genre.innerHTML = 'Драма';
            poster.style.backgroundImage = "url('img/bg.jpg')";
        };
        

        const sortArr = (arr) => {
            arr.sort();
        };


        function createMovieList(films, parent) {
            parent.innerHTML = "";
            sortArr(films);
            films.forEach(function(film, i) {
                parent.innerHTML +=  `
                <li class="promo__interactive-item">${++i}. ${film}
                <div class="delete"></div> 
                </li>`;
            });

            document.querySelectorAll(".delete").forEach(function(item, i){
                item.addEventListener('click', () => {
                        item.parentElement.remove();
                        movieDB.movies.splice(i, 1);
                        createMovieList(films, parent);
            
                });
            });

        }
        
        
  
    
    
    deleteAdv(adv);
    makeChanges();
    // sortArr( movieDB.movies);
    createMovieList(movieDB.movies, moviesList);


});