import { Timestamp } from "@angular/fire/firestore";

export class Common{
	id: number;
	tagName:string;
	disabled: boolean;
	reference: string;
	timestamp: string;
}

export class WebSite extends Common {
	link: string;
	title: string;
	target: string;
	userName: string;
	icon: string;
}

export class PersonalDetails extends Common {
	name: string;
	shortName: string;
	userImage: string;
	mobile: string;
	email: string;
	position: string;
	websiteUrl: string;
	personalStatement: string;
	docResumeUrl: string;
	pdfResumeUrl: string;
	aboutMe: AboutMeDetail[] = [];
	whatIDo: WhatIDoDetail[] = [];
}

export class AboutMeDetail{
	id: number;
	content: string;
}

export class WhatIDoDetail{
	id: number;
	icon: string;
	title: string;
	content: string;
}

export class WebsiteDetails extends Common {
	companyName: string
	email: string;
	websiteUrl: string;
	logoUrl: string;
}

export class Education extends Common{
	institution: string;
	degree: string;
	course: string;
	url: string;
	dateFrom: Timestamp;
	dateUntil: Timestamp;
	grade: string;
	address: string;
}

export class Publications extends Common{
	type: string;
	title: string;
	authorship: string;
	url: string;
	publishedBy: string;
	date: string;
	address: string;
}

export class Achievements{
	id: number;
	contentHtml: string;
}

export class Skills  extends Common{
	name: string;
	percent: number;
	contentHtml: string;	
}

export class Experience extends Common{
	dateFrom: string;
	dateUntil: string;
	title: string;
	company: string;
	jobTitle: string;
	jobDescription: string;
	technologies: string[] = [];
	details: ExperienceDetail[] = [];
}

export class ExperienceDetail{
	id: number;
	content: string;
}

export class ContactDetails extends Common {
	name: string;
	content: string;
	email: string;
	contactNo: string;
}
