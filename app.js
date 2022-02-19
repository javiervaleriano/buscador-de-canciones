import resetForm from "./functions/resetForm.js";
import { searchFetch } from "./functions/searchFetch.js";
import { breakParagraphs } from "./functions/breakParagraphs.js";
import { firstLetterUppercase } from "./functions/firstLetterUppercase.js";
import { randomLink } from "./functions/randomLink.js";

const d = document,
	$inputArtist = d.querySelector(".form__artist"),
	$inputSong = d.querySelector(".form__song"),
	$loader = d.querySelector(".lds-spinner"),
	$biographyContainer = d.querySelector(".bio-song"),
	$biographyTitle = $biographyContainer.querySelector(".biography__title"),
	$biographyImg = $biographyContainer.querySelector(".biography__img"),
	$biographyP = $biographyContainer.querySelector(".biography__p"),
	$song = d.querySelector(".song"),
	$songTitle = $song.querySelector(".song__title"),
	$songLyrics = $song.querySelector(".song__lyrics"),
	$errorMsg = d.querySelector(".error-msg");

// CONFIGURACIÓN DEL ENVÍO DEL FORMULARIO
d.addEventListener("submit", async function (e) {
	const obj = e.target;

	if (obj.matches(".form")) {
		let $inputArtist = obj.querySelector(".form__artist"),
			$inputSong = obj.querySelector(".form__song");

		e.preventDefault();

		if (!$biographyContainer.classList.contains("none"))
			$biographyContainer.classList.add("none");
		if (!$song.classList.contains("none")) $song.classList.add("none");
		if (!$errorMsg.classList.contains("none")) $errorMsg.classList.add("none");

		$loader.classList.remove("none");

		let [artist, song] = await searchFetch(
			$inputArtist.value,
			$inputSong.value
		);

		if (!artist.artists || song.err) {
			$loader.classList.add("none");
			$errorMsg.classList.remove("none");
			$errorMsg.textContent =
				artist.artists === null
					? `No se encontró a "${$inputArtist.value}"`
					: `No se encontró la canción "${$inputSong.value}", revisa que sea interpretada por "${$inputArtist.value}". Sino, entonces no se encuentra en nuestra Base de Datos`;
		} else {
			let artistInfo = artist.artists[0];

			$loader.classList.add("none");

			$biographyContainer.classList.remove("none");
			$biographyTitle.textContent = artistInfo.strArtist;
			$biographyImg.src = `${artistInfo.strArtistThumb}/preview`;
			$biographyImg.alt = artistInfo.strArtist;
			$biographyP.innerHTML =
				artistInfo.strBiographyES === null
					? breakParagraphs(artistInfo.strBiographyEN)
					: breakParagraphs(artistInfo.strBiographyES);

			$song.classList.remove("none");
			$songTitle.textContent = firstLetterUppercase($inputSong.value);
			$songLyrics.innerHTML = breakParagraphs(song.lyrics);

			$errorMsg.classList.add("none");
		}

		resetForm(obj);
	}
});

// CONFIGURACIÓN A MEDIDA QUE SE ESCRIBE EN LOS INPUTS DEL FORMULARIO
d.addEventListener("keyup", function (e) {
	const obj = e.target,
		submitBtn = d.querySelector(".form__submit-btn");

	if (obj === $inputArtist) {
		obj.value.length > 0 && $inputSong.value.length > 0
			? (submitBtn.disabled = false)
			: (submitBtn.disabled = true);
	} else if (obj === $inputSong) {
		obj.value.length > 0 && $inputArtist.value.length > 0
			? (submitBtn.disabled = false)
			: (submitBtn.disabled = true);
	}
});

// ESTABLECER UN ENLACE ALEATORIO AL VÍNCULO DEL FOOTER
const $footerLink = d.querySelector(".footer__link");

setInterval(() => ($footerLink.href = randomLink()), 5000);
$footerLink.href = randomLink();
