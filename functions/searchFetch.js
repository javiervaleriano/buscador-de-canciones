import { snakeCase } from "./snakeCase.js";

const options = {
	method: "GET",
};

async function searchArtist(artist) {
	const urlBio = "https://www.theaudiodb.com/api/v1/json/2/search.php?s=";
	let endpoint = `${urlBio}${snakeCase(artist)}`;

	try {
		let controller = new AbortController();
		options.signal = controller.signal;

		let res = await fetch(endpoint, options);

		if (!res.ok)
			throw {
				err: true,
				status: res.status || "00",
				statusText: res.statusText || "Ocurrió un error",
			};

		let json = await res.json();

		setTimeout(() => controller.abort(), 1000);

		return json;
	} catch (err) {
		return err;
	}
}

async function searchLyrics(artist, song) {
	const url = "https://api.lyrics.ovh/v1/";
	let endpoint = `${url}${snakeCase(artist)}/${snakeCase(song)}`;

	try {
		let controller = new AbortController();
		options.signal = controller.signal;

		let res = await fetch(endpoint, options);

		if (!res.ok)
			throw {
				err: true,
				status: res.status || "00",
				statusText: res.statusText || "Ocurrió un error",
			};

		setTimeout(() => controller.abort(), 1000);

		return await res.json();
	} catch (err) {
		return err;
	}
}

export function searchFetch(artist, song) {
	artist = snakeCase(artist);
	song = snakeCase(song);

	return Promise.all([searchArtist(artist), searchLyrics(artist, song)])
		.then(res => res)
		.catch(err => err);
}
