document.addEventListener('DOMContentLoaded', () => {

    const playBtn = document.querySelector('.header__menu__btn'),
		  checkLevel = document.querySelectorAll('.header__menu__level'),
		  playSection = document.querySelector('.play__zone'),
		  winSection = document.querySelector('.play__win'),
		  headerMenu = document.querySelector('.header__menu'),
		  gameMenu = document.querySelector('.game__menu'),
		  restartBtn = document.querySelector('.game__menu__btn');
		  
	let	numbersLine = [], //переменная для хранения количества парных карт и в цикле игры записываем сюда открытые карты
		numbersCard = {}, //переменная для хранения открытой карты
		countMistakes = 0,
		countOpenCards = 0, 
		statusIteration = 'true', //переменная отслеживающая, завершился ли ход, иначе новые карточки не открываются
		itemsSkin = document.querySelector('.game__skin__item'),
		pathSkin = 'img/skin_1/',
		classSkin = 'play__marvel',
		selectedLevel = 2;

	// отслеживаем выбор скина
	headerMenu.addEventListener('click', (skillItem) => {
		if (skillItem.target.parentElement !== itemsSkin && skillItem.target.parentElement.classList.contains('game__skin__item')) {
			skillItem.target.parentElement.classList.add('skin__selected');
			pathSkin = skillItem.target.parentElement.dataset.source;
			classSkin = skillItem.target.parentElement.dataset.class;
			itemsSkin.classList.remove('skin__selected');
			itemsSkin = skillItem.target.parentElement
			if (playSection.innerHTML !== '') {
				playSection.innerHTML = '';
				for (i = 1; i <= selectedLevel; i++) {
					playSection.innerHTML += `
						<div class="play__card ${classSkin}"></div>
						<div class="play__card ${classSkin}"></div>
						<div class="play__card ${classSkin}"></div>
						<div class="play__card ${classSkin}"></div>
						<div class="play__card ${classSkin}"></div>
						<div class="play__card ${classSkin}"></div>
						<div class="play__card ${classSkin}"></div>
						<div class="play__card ${classSkin}"></div>
						`;
				}
			}
		}
	});


	// отображение поля с картами, в зависимости от выбранной сложности
	checkLevel.forEach(item => {
		item.addEventListener('click', (itemNew) => {
			selectedLevel = itemNew.currentTarget.dataset.skill;
			playSection.innerHTML = '';
			for (i = 1; i <= selectedLevel; i++) {
				playSection.innerHTML += `
					<div class="play__card ${classSkin}"></div>
					<div class="play__card ${classSkin}"></div>
					<div class="play__card ${classSkin}"></div>
					<div class="play__card ${classSkin}"></div>
					<div class="play__card ${classSkin}"></div>
					<div class="play__card ${classSkin}"></div>
					<div class="play__card ${classSkin}"></div>
					<div class="play__card ${classSkin}"></div>
					`;
				}
			playBtn.style.display = 'block';
		})
	});
		
	//запуск игры
	playBtn.addEventListener('click', () => {
		headerMenu.style.display = 'none';
		gameMenu.style.display = 'block';
		restartBtn.addEventListener('click', () => {location.reload()});
		let playCard = document.querySelectorAll('.play__card');

		//генерируем набор цифр для карт, учитывая выбранный тип игры
		for (let i = 1; i <= playCard.length/2; i++) {
			numbersLine.push(i);
			numbersLine.push(i);
		};

		// цикл для присваивания дата атрибута number и open
		playCard.forEach(item => {
			while (!item.dataset.number) {
				let someIndex = Math.floor(Math.random() * numbersLine.length); //генерируем случайное число от 0 до длины массива numbersLine (не влючительно) 
				item.dataset.number = numbersLine[someIndex]; //присваиваем дата атрибуту "number" цифру из массива по сгенерированному случайному индексу
				item.dataset.open = 'false'; //присваиваем дата атрибуту "open" значение false (это будет флаг для статуса карты на поле - открыта или нет)
				numbersLine.splice(someIndex, 1); //удаляем использованную цифру из массива
			}
		});

		// показываем изображения на 4 секунды
		playCard.forEach(item => {
			item.innerHTML = `
				<img class="play__card__img" src="../../${pathSkin}${item.dataset.number}.png" alt="img${item.dataset.number}">
			`;
		});
		setTimeout(() => {
			playCard.forEach(item => {
				item.innerHTML = '';
			});
		}, 4000);

		//алгоритм игры
		playSection.addEventListener('click', (event) => {
			if (numbersLine.length === 0 && statusIteration === 'true') {
				if (event.target.dataset.open == 'false') {
					event.target.innerHTML = `
						<img class="play__card__img" src="../../${pathSkin}${event.target.dataset.number}.png" alt="img${event.target.dataset.number}">
					`;
					event.target.dataset.open = 'true';
					numbersLine.push(event.target.dataset.number);
					numbersCard = event.target;
				}
			} else {
				if (event.target.dataset.open == 'false' && statusIteration === 'true') {
					statusIteration = 'false';
					event.target.innerHTML = `
						<img class="play__card__img" src="../../${pathSkin}${event.target.dataset.number}.png" alt="img${event.target.dataset.number}">
					`;
					setTimeout(() => {
						if (event.target.dataset.number == numbersLine[0]) {
							event.target.dataset.open = 'true';
							countOpenCards += 2;
							numbersLine = [];
							numbersCard = {};
							statusIteration = 'true';
							if (countOpenCards === playSection.children.length) {
								playSection.style.display = 'none';
								winSection.style.display = 'block';
								winSection.innerHTML = 'ПОБЕДА !!!';
							}
						} else {
							event.target.innerHTML = '';
							event.target.dataset.open = 'false';
							numbersCard.innerHTML = '';
							numbersCard.dataset.open = 'false';
							numbersCard = {};
							numbersLine = [];
							countMistakes += 1;
							gameMenu.children[0].innerHTML = `Количество ошибок: ${countMistakes}`; //добавить илюстрацию с изменением картинки, чем больше ошибок тем хуже смайл, сделать максимальное возможное количество ошибок, после которого игра заканчивается.
							statusIteration = 'true';
						}
					}, 900)
				}
			}
		})
	})
});