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
		// цикл для присваивания дата атрибута number
		playCard.forEach(item => {
			while (!item.dataset.number) {
				//генерируем случайное число от 0 до длины массива numbersLine (не влючительно) 
				let someIndex = Math.floor(Math.random() * numbersLine.length);
				item.dataset.number = numbersLine[someIndex]; //присваиваем дата атрибуту "number" цифру из массива по сгенерированному случайному индексу
				item.dataset.isOpen = 'false'; //присваиваем дата атрибуту "isOpen" значение false (это будет флаг для статуса карты на поле - открыта или нет)
				numbersLine.splice(someIndex, 1); //удаляем использованную цифру из массива
				console.log(numbersLine);
			}
			console.log(item.dataset.number);
		});			
		playCard.forEach(item => {
			item.addEventListener('click', (eventNew) => {
				if (numbersLine.length === 0) {
					if (eventNew.currentTarget.dataset.isOpen == 'false') {
						eventNew.currentTarget.innerHTML = `
							<img class="play__card__img" src="../../img/${eventNew.currentTarget.dataset.number}.jpeg" alt="img${eventNew.currentTarget.dataset.number}">
						`;
						eventNew.currentTarget.dataset.isOpen = 'true';
						numbersLine.push(eventNew.currentTarget.dataset.number);
						console.log(numbersLine);
					};
				} else {
					if (eventNew.currentTarget.dataset.isOpen == 'false') {
						eventNew.currentTarget.innerHTML = `
							<img class="play__card__img" src="../../img/${eventNew.currentTarget.dataset.number}.jpeg" alt="img${eventNew.currentTarget.dataset.number}">
						`;
						//вставить тайм аут
						if (eventNew.currentTarget.dataset.number == numbersLine[0]) {
							eventNew.currentTarget.dataset.isOpen = 'true';
							numbersLine = [];
							console.log(numbersLine);
						} else {
							eventNew.currentTarget.innerHTML = '';
							eventNew.currentTarget.dataset.isOpen = 'false';
							playCard.forEach((cardItem) => {
								if (cardItem.dataset.number == numbersLine[0]) {
									cardItem.innerHTML = '';
									cardItem.dataset.isOpen = 'false';
									numbersLine = [];
									console.log(numbersLine);
								};
							});
						};
					};
				};

			});
		});
	});
});