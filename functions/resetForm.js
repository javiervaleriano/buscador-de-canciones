const d = document;

export default function resetForm(form) {
	form.reset();
	form.querySelector("input[type='submit']").disabled = true;
}
