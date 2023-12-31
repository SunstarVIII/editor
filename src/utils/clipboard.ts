import { insertAtCursor } from './utils';

const fileTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/webp'];

const file2Base64 = (file: File): Promise<string> => {
	return new Promise<string> ((resolve, reject)=> {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result?.toString() || '');
		reader.onerror = error => reject(error);
	});
}

function onCopy($editorDiv: JQuery<HTMLDivElement>, ev: ClipboardEvent) {
	const selection = document.getSelection();
	console.log(selection?.toString());
}

function onPaste($editorDiv: JQuery<HTMLDivElement>, ev: ClipboardEvent) {
	const clipboardData = ev.clipboardData!;
	const file =
		clipboardData.items &&
		clipboardData.items.length > 0 &&
		clipboardData.items[clipboardData.items.length - 1].getAsFile();
	
	if (file) {
		ev.preventDefault();
		if (fileTypes.indexOf(file.type) >= 0) {
			file2Base64(file)
				.then((value) => {
					const img = document.createElement('img');

					img.src = value;
					img.className = 'img';

					insertAtCursor(img);
				})
				.catch((reason) => {

				}
			);
		}
	}
}

export { onCopy, onPaste };
