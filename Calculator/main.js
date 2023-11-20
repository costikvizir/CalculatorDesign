const keys = document.querySelectorAll('.key');
const display_input = document.querySelector('.display .input');
const display_output = document.querySelector('.display .output');

let input = "";

for (let key of keys) {
	const value = key.dataset.key;

	key.addEventListener('click', () => {
		if (value == "clear") {
			input = "";
			display_input.innerHTML = "";
			display_output.innerHTML = "";
		} else if (value == "backspace") {
			input = input.slice(0, -1);
			display_input.innerHTML = CleanInput(input);
		} else if (value == "=") {
			display_output.innerHTML = GetResult().then(value => value.toString());
		} else {
			input += value;
			display_input.innerHTML = CleanInput(input);
		}
	})

}

function CleanInput(input) {
	let input_array = input.split("");
	let input_array_length = input_array.length;

	for (let i = 0; i < input_array_length; i++) {
		if (input_array[i] == "*") {
			input_array[i] = ` <span class="operator">×</span> `;
		} else if (input_array[i] == "/") {
			input_array[i] = ` <span class="operator">÷</span> `;
		} else if (input_array[i] == "+") {
			input_array[i] = ` <span class="operator">+</span> `;
		} else if (input_array[i] == "-") {
			input_array[i] = ` <span class="operator">-</span> `;
		} else if (input_array[i] == "(") {
			input_array[i] = `<span class="left-bracket">(</span>`;
		} else if (input_array[i] == ")") {
			input_array[i] = `<span class="right-bracket">)</span>`;
		}
	}
	return input_array.join("");
}

async function GetResult() {
	const response = await fetch(`/Home/Index/`, {
		method: "GET",
		headers: { "Accept": "application/json" }
	});
	if (response.ok === true) {
		const response = await response.json();
	}
	else {
		const error = await response.json();
	}
}
