document.addEventListener('DOMContentLoaded', () => {

    const submit = document.querySelector('.header__menu__btn'),
		  checkLevel = document.querySelectorAll('.header__menu__level'),
		  playSection = document.querySelector('.play__zone'),
		  headerMenu = document.querySelector('.header__menu');

	checkLevel.forEach(item => {
		item.addEventListener('click', (itemNew) => {
			playSection.innerHTML = '';
			for (i = 1; i <= itemNew.currentTarget.dataset.skill; i++) {
				playSection.innerHTML += `
					<div class="play__card"></div>
					<div class="play__card"></div>
					<div class="play__card"></div>
					<div class="play__card"></div>
					<div class="play__card"></div>
					<div class="play__card"></div>
					<div class="play__card"></div>
					<div class="play__card"></div>
					`;
				}
		})
	});
	
	let numbersLine = []; //переменная для хранения количества парных карт и в цикле игры записываем сюда открытые карты
	//запуск игры
	submit.addEventListener('click', (event) => {
		headerMenu.style.display = 'none';
		playCard = document.querySelectorAll('.play__card');
		//генерируем набор цифр для карт, учитывая выбранный тип игры
		for (let i = 1; i <= playCard.length/2; i++) {
			numbersLine.push(i);
			numbersLine.push(i);
		};
		// цикл для присваивания дата атрибута number и isOpen
		playCard.forEach(item => {
			while (!item.dataset.number) {
				//генерируем случайное число от 0 до длины массива numbersLine (не влючительно) 
				let someIndex = Math.floor(Math.random() * numbersLine.length);
				item.dataset.number = numbersLine[someIndex]; //присваиваем дата атрибуту "number" цифру из массива по сгенерированному случайному индексу
				item.dataset.isOpen = 'false'; //присваиваем дата атрибуту "isOpen" значение false (это будет флаг для статуса карты на поле - открыта или нет)
				numbersLine.splice(someIndex, 1); //удаляем использованную цифру из массива
			}
		});			
		playSection.addEventListener('click', (event) => {
			if (numbersLine.length === 0) {
				if (event.target.dataset.isOpen == 'false') {
					event.target.innerHTML = `
						<img class="play__card__img" src="../../img/${event.target.dataset.number}.jpeg" alt="img${event.target.dataset.number}">
					`;
					event.target.dataset.isOpen = 'true';
					numbersLine.push(event.target.dataset.number);
				}
			} else {
				if (event.target.dataset.isOpen == 'false') {
					event.target.innerHTML = `
						<img class="play__card__img" src="../../img/${event.target.dataset.number}.jpeg" alt="img${event.target.dataset.number}">
					`;
					//вставить тайм аут
					if (event.target.dataset.number == numbersLine[0]) {
						event.target.dataset.isOpen = 'true';
						numbersLine = [];
					} else {
						event.target.innerHTML = '';
						event.target.dataset.isOpen = 'false';
						playCard.forEach((cardItem) => {
							if (cardItem.dataset.number == numbersLine[0]) {
								cardItem.innerHTML = '';
								cardItem.dataset.isOpen = 'false';
								numbersLine = [];
							}
						})
					}
				}
			}
		});
	});
});