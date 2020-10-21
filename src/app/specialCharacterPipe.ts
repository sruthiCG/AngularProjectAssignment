import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
	name: 'SpecialCharacterPipe'
})
export class SpecialCharacterPipe implements PipeTransform {

	transform(value: string): string {
		let newVal = value.replace(/[^\w\s]/gi, "") // Remove non word characters
			.trim() // Remove trailing and leadings spaces
			.replace(/\b\w/g, (s) => s.toUpperCase()) // Make the first letter of each word upper case
		return newVal;
	}

}