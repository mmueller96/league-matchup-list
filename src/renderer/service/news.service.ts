import axios from "axios";
import NewsAPI from "newsapi";
import { Source, TopHeadline } from '../types/news';

export class NewsService {
	apiKey: string;
	newsAPI: NewsAPI;
	baseURL: string;

	constructor() {
		this.apiKey = "214f16b3400541f39f40d06612953571";
		this.newsAPI = new NewsAPI(this.apiKey);
		this.baseURL = "https://newsapi.org/v2/"
	}

	async getSources(): Promise<Source[]> {
		let URL: string = this.baseURL + "sources?apiKey=" + this.apiKey;
		let data: object = {};
		await axios.get(URL).then(response => {
			data = response;
		});
		//@ts-ignore
		return data.data.sources as Source[];
	}

	async getTopHeadlines(source: string): Promise<TopHeadline[]> {
		let URL: string = this.baseURL + "top-headlines?sources=" + source + "&apiKey=" + this.apiKey;
		let data: object = {};
		await axios.get(URL).then(response => {
			data = response;
		});
		//@ts-ignore
		return data.data.articles as TopHeadline[];
	}
}