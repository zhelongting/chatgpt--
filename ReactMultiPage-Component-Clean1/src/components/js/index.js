const slideBox = document.querySelectorAll(".slide_box");
let timer;
let index = 0;

const length = slideBox.length;

const setTime = () => {
	timer = setInterval(() => {
		index++;
		index = index === length ? 0 : index;
		slideBox[index].className = "slide_box active";
		const preIndex = index === 0 ? length - 1 : index - 1;
		slideBox[preIndex].className = "slide_box pre";
		const preIndex2 = preIndex === 0 ? length - 1 : preIndex - 1;
		slideBox[preIndex2].className = "slide_box";
		const nextIndex = index === length - 1 ? 0 : index + 1;
		slideBox[nextIndex].className = "slide_box";
		setTimeout(() => {
			slideBox[nextIndex].className = "slide_box next";
		}, 1000);
	}, 3000);
};

setTime();
